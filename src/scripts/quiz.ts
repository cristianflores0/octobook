import { oceanoPorId, zonas, type Nivel, type OceanoId } from '../data/oceanos';
import { libros } from '../data/libros';
import {
  profundidadObjetivo,
  recomendar,
  type Busqueda,
  type Frecuencia,
  type Motivo,
  type Recomendacion,
  type Respuestas,
} from './recomendar';
import { cambiarEspecie, desplegar, gsap, irA, mecer, reducido, ScrollTrigger, vestir } from './motion';

const MAX_OCEANOS = 3;
const PASOS = 5;
const METROS_PASO = [0, 200, 1000, 3000, 5000];

const familiaridades: { v: Nivel; t: string }[] = [
  { v: 0, t: 'Nunca me metí' },
  { v: 1, t: 'Leí algunos' },
  { v: 2, t: 'Lo conozco bien' },
  { v: 3, t: 'Es mi hábitat' },
];

const motivos: Record<Motivo, string> = {
  'tu-profundidad': 'A tu profundidad',
  descenso: 'Para bajar un nivel',
  'tomar-aire': 'Para tomar aire',
  expedicion: 'Expedición a otro océano',
};

const estado = {
  paso: 0,
  frecuencia: null as Frecuencia | null,
  oceanos: [] as OceanoId[],
  familiaridad: {} as Partial<Record<OceanoId, Nivel>>,
  leidos: new Set<string>(),
  fueraDeCatalogo: new Set<string>(),
  busqueda: null as Busqueda | null,
};

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/* ---------- Validación y navegación ---------- */

function pasoValido(paso = estado.paso) {
  switch (paso) {
    case 0:
      return estado.frecuencia !== null;
    case 1:
      return estado.oceanos.length > 0;
    case 2:
      return estado.oceanos.every((id) => estado.familiaridad[id] !== undefined);
    case 3:
      return true;
    case 4:
      return estado.busqueda !== null;
  }
  return false;
}

function actualizarControles() {
  const form = $('[data-quiz]');
  $('[data-quiz-paso-txt]', form).textContent = `Paso ${estado.paso + 1} de ${PASOS}`;
  $('[data-quiz-metros]', form).textContent = METROS_PASO[estado.paso].toLocaleString('es-AR');
  gsap.to($('[data-quiz-barra]', form), { width: `${((estado.paso + 1) / PASOS) * 100}%`, duration: 0.5 });

  const atras = $('[data-quiz-atras]', form);
  atras.classList.toggle('invisible', estado.paso === 0);

  const sig = $<HTMLButtonElement>('[data-quiz-siguiente]', form);
  sig.disabled = !pasoValido();
  sig.textContent = estado.paso === PASOS - 1 ? 'Sumergirme 🐙' : 'Siguiente ↓';

  actualizarPulpoGuia();
}

/** El pulpo al costado del cuestionario cambia de especie según los metros del paso */
function actualizarPulpoGuia() {
  const svg = document.querySelector<SVGSVGElement>('[data-quiz-pulpo] svg');
  if (!svg) return;
  const metros = METROS_PASO[estado.paso];
  const zona = zonas.find((z) => metros < z.profundidad) ?? zonas[zonas.length - 1];
  if (svg.dataset.especie === zona.especie) return;

  cambiarEspecie(svg, zona.especie);
  $('[data-quiz-pulpo-nombre]').textContent = zona.pulpo;
  $('[data-quiz-pulpo-cientifico]').textContent = zona.cientifico;
}

function irAPaso(nuevo: number) {
  const form = $('[data-quiz]');
  const actual = $(`[data-paso="${estado.paso}"]`, form);
  const sig = $(`[data-paso="${nuevo}"]`, form);
  const dir = nuevo > estado.paso ? 1 : -1;

  if (nuevo === 2) renderFamiliaridad();
  if (nuevo === 3) renderSugeridos();

  estado.paso = nuevo;
  actualizarControles();

  if (actual === sig) return;
  gsap
    .timeline()
    .to(actual, { y: -30 * dir, opacity: 0, duration: reducido ? 0 : 0.25, ease: 'power2.in' })
    .add(() => {
      actual.classList.add('hidden');
      sig.classList.remove('hidden');
    })
    .fromTo(sig, { y: 30 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: reducido ? 0 : 0.4, ease: 'power2.out' })
    .add(() => ScrollTrigger.refresh());
}

/* ---------- Pasos dinámicos ---------- */

function renderFamiliaridad() {
  const cont = $('[data-familiaridad]');
  cont.innerHTML = '';
  for (const id of estado.oceanos) {
    const o = oceanoPorId[id];
    const bloque = document.createElement('div');
    bloque.innerHTML = `
      <p class="flex items-center gap-2 font-semibold text-white">
        <span class="size-3 rounded-full" style="background:${o.color}"></span>${o.genero}
        <span class="font-normal text-espuma/50">· ${o.nombre}</span>
      </p>
      <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Cuánto conocés ${o.genero}">
        ${familiaridades
          .map(
            (f) => `<button type="button" class="opcion py-3 text-center text-sm" role="radio"
              aria-checked="${estado.familiaridad[id] === f.v}" data-campo="familiaridad" data-oceano="${id}" data-valor="${f.v}">${f.t}</button>`,
          )
          .join('')}
      </div>`;
    cont.append(bloque);
  }
}

const chip = (texto: string, activo: boolean, attrs: string) =>
  `<button type="button" class="opcion rounded-full px-3 py-1.5 text-sm" aria-pressed="${activo}" ${attrs}>${texto}</button>`;

function renderSugeridos() {
  $('[data-leidos-sugeridos]').innerHTML = libros
    .filter((l) => estado.oceanos.includes(l.oceano))
    .map((l) => chip(`${l.titulo} <span class="text-espuma/50">· ${l.autor}</span>`, estado.leidos.has(l.id), `data-leido="${l.id}"`))
    .join('');
  renderExtras();
}

function renderExtras() {
  const extras = libros.filter((l) => estado.leidos.has(l.id) && !estado.oceanos.includes(l.oceano));
  $('[data-leidos-extra]').innerHTML = [
    ...extras.map((l) => chip(`${l.titulo} ✕`, true, `data-leido="${l.id}"`)),
    ...[...estado.fueraDeCatalogo].map((t) =>
      chip(`${escapar(t)} <span class="text-espuma/50">(anotado)</span> ✕`, true, `data-fuera="${encodeURIComponent(t)}"`),
    ),
  ].join('');
}

function agregarLibro() {
  const input = $<HTMLInputElement>('[data-buscar-libro]');
  const texto = input.value.trim();
  if (!texto) return;
  const libro = libros.find((l) => normalizar(l.titulo) === normalizar(texto));
  if (libro) estado.leidos.add(libro.id);
  else estado.fueraDeCatalogo.add(texto);
  input.value = '';
  renderSugeridos();
}

/* ---------- Selección de océanos (compartida con el carrusel) ---------- */

function alternarOceano(id: OceanoId) {
  if (estado.oceanos.includes(id)) {
    estado.oceanos = estado.oceanos.filter((o) => o !== id);
  } else if (estado.oceanos.length < MAX_OCEANOS) {
    estado.oceanos.push(id);
  } else {
    // Si ya hay tres, el más viejo deja lugar al nuevo
    estado.oceanos = [...estado.oceanos.slice(1), id];
  }
  sincronizarOceanos();
}

function sincronizarOceanos() {
  $$('[data-campo="oceanos"]').forEach((b) =>
    b.setAttribute('aria-pressed', String(estado.oceanos.includes(b.dataset.valor as OceanoId))),
  );
  $$('[data-elegir-oceano]').forEach((b) => {
    const activo = estado.oceanos.includes(b.dataset.elegirOceano as OceanoId);
    b.setAttribute('aria-pressed', String(activo));
    b.classList.toggle('!border-naranja', activo);
    b.classList.toggle('!bg-naranja/15', activo);
    $('[data-txt]', b).textContent = activo ? 'Elegido ✓' : 'Explorar este océano';
  });
  // El guía se pone el accesorio del último océano elegido
  const guia = document.querySelector<SVGSVGElement>('[data-quiz-pulpo] svg');
  if (guia) vestir(guia, estado.oceanos.at(-1));
  actualizarControles();
}

/* ---------- Resultados ---------- */

function tarjeta(rec: Recomendacion, i: number) {
  const tpl = $<HTMLTemplateElement>('#tpl-libro');
  const nodo = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
  const { libro, motivo } = rec;
  const o = oceanoPorId[libro.oceano];
  const z = zonas[libro.nivel];

  const portada = $('[data-portada]', nodo);
  portada.style.background = `linear-gradient(160deg, ${o.color}, color-mix(in oklab, ${o.color} 45%, #030a1c))`;
  portada.style.color = '#071a42';
  $('[data-portada-oceano]', nodo).textContent = o.nombre;
  $('[data-portada-titulo]', nodo).textContent = libro.titulo;
  $('[data-portada-autor]', nodo).textContent = libro.autor;

  $('[data-tentaculo]', nodo).textContent = `Tentáculo ${i + 1}`;
  $('[data-titulo]', nodo).textContent = libro.titulo;
  $('[data-autor]', nodo).textContent = libro.autor;
  const chipOceano = $('[data-chip-oceano]', nodo);
  chipOceano.textContent = o.genero;
  chipOceano.style.borderColor = o.color;
  chipOceano.style.color = o.color;
  $('[data-chip-zona]', nodo).textContent = `${z.metros} · ${z.pulpo}`;
  $('[data-chip-motivo]', nodo).textContent = motivos[motivo];
  $('[data-resena]', nodo).textContent = libro.resena;

  const busqueda = encodeURIComponent(`${libro.titulo} ${libro.autor}`);
  $<HTMLAnchorElement>('[data-tienda="amazon"]', nodo).href = `https://www.amazon.com/s?k=${busqueda}&i=stripbooks`;
  $<HTMLAnchorElement>('[data-tienda="buscalibre"]', nodo).href =
    `https://www.buscalibre.com.ar/libros/search?q=${busqueda}`;
  return nodo;
}

function mostrarResultados() {
  const respuestas: Respuestas = {
    frecuencia: estado.frecuencia ?? 0,
    oceanos: estado.oceanos,
    familiaridad: estado.familiaridad,
    leidos: [...estado.leidos],
    busqueda: estado.busqueda ?? 'atrapar',
  };
  const recs = recomendar(respuestas);

  // La especie del guía depende de la profundidad promedio alcanzada
  const promedio =
    estado.oceanos.reduce((s, id) => s + profundidadObjetivo(respuestas, id), 0) / estado.oceanos.length;
  const zona = zonas[Math.round(promedio)];

  $('[data-res-titulo]').textContent = zona.llegada;
  $('[data-res-bajada]').textContent =
    `${zona.metros} bajo la superficie. Acá te guía el ${zona.pulpo}, con ocho libros elegidos para vos: ` +
    'algunos a tu profundidad, otros para animarte a bajar un poco más.';
  $('[data-res-especie]').classList.remove('hidden');
  $('[data-res-especie-nombre]').textContent = zona.pulpo;
  $('[data-res-especie-cientifico]').textContent = zona.cientifico;
  $('[data-res-especie-zona]').textContent = zona.estetica;
  const acciones = $('[data-res-acciones]');
  acciones.classList.remove('hidden');
  acciones.classList.add('flex');

  const izq = $('[data-res-col="izq"]');
  const der = $('[data-res-col="der"]');
  izq.innerHTML = '';
  der.innerHTML = '';
  const tarjetas = recs.map((r, i) => {
    const t = tarjeta(r, i);
    gsap.set(t, { opacity: 0 });
    (i < 4 ? izq : der).append(t);
    return t;
  });

  ScrollTrigger.refresh();
  const svg = $<SVGSVGElement>('[data-res-pulpo] svg');
  irA('#tentaculos', -40);
  gsap
    .timeline({ delay: reducido ? 0 : 1 })
    .add(cambiarEspecie(svg, zona.especie))
    .add(() => vestir(svg, estado.oceanos[0]), '-=0.9')
    .add(desplegar(svg, tarjetas), '-=0.4');
}

/* ---------- Eventos ---------- */

export function iniciarQuiz() {
  const form = $('[data-quiz]');
  const guia = document.querySelector<SVGSVGElement>('[data-quiz-pulpo] svg');
  if (guia) mecer(guia, 5);

  form.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!btn) return;

    const campo = btn.dataset.campo;
    if (campo === 'frecuencia' || campo === 'busqueda' || campo === 'familiaridad') {
      const grupo = btn.closest('[role="radiogroup"]')!;
      $$('[role="radio"]', grupo).forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
      if (campo === 'frecuencia') estado.frecuencia = Number(btn.dataset.valor) as Frecuencia;
      if (campo === 'busqueda') estado.busqueda = btn.dataset.valor as Busqueda;
      if (campo === 'familiaridad') estado.familiaridad[btn.dataset.oceano as OceanoId] = Number(btn.dataset.valor) as Nivel;
      actualizarControles();
    } else if (campo === 'oceanos') {
      alternarOceano(btn.dataset.valor as OceanoId);
    } else if (btn.dataset.leido) {
      const id = btn.dataset.leido;
      estado.leidos.has(id) ? estado.leidos.delete(id) : estado.leidos.add(id);
      btn.setAttribute('aria-pressed', String(estado.leidos.has(id)));
      if (btn.closest('[data-leidos-extra]')) renderExtras();
    } else if (btn.dataset.fuera) {
      estado.fueraDeCatalogo.delete(decodeURIComponent(btn.dataset.fuera));
      renderExtras();
    } else if (btn.hasAttribute('data-agregar-libro')) {
      agregarLibro();
    } else if (btn.hasAttribute('data-quiz-atras')) {
      irAPaso(Math.max(0, estado.paso - 1));
    } else if (btn.hasAttribute('data-quiz-siguiente') && pasoValido()) {
      if (estado.paso < PASOS - 1) irAPaso(estado.paso + 1);
      else mostrarResultados();
    }
  });

  $('[data-buscar-libro]').addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      e.preventDefault();
      agregarLibro();
    }
  });

  // Desde el carrusel: elegir un océano y llevar al cuestionario
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-elegir-oceano]');
    if (!btn) return;
    alternarOceano(btn.dataset.elegirOceano as OceanoId);
  });

  // "Volver a sumergirme" conserva las respuestas para poder ajustarlas
  document.querySelector('[data-reiniciar]')?.addEventListener('click', () => irAPaso(0));

  actualizarControles();
}
