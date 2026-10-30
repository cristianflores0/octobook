import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { zonas } from '../data/oceanos';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText);

export { gsap, ScrollTrigger };
export const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/* ---------- Scroll suave ---------- */

export function iniciarScroll() {
  if (!reducido) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-scroll]');
    if (!a) return;
    e.preventDefault();
    irA(a.getAttribute('href')!);
  });
}

export function irA(destino: string | HTMLElement, offset = 0) {
  const el = typeof destino === 'string' ? document.querySelector<HTMLElement>(destino) : destino;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.8 });
  else el.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
}

/* ---------- El pulpo ---------- */

const tentaculos = (svg: SVGSVGElement, i: number) =>
  svg.querySelectorAll<SVGPathElement>(`.tentaculo[data-t="${i}"]`);

const origenDe = (el: Element) => {
  const d = (el as HTMLElement).dataset;
  return `${d.ox} ${d.oy}`;
};

/** Balanceo continuo de los 8 tentáculos (y aleteo si es un Dumbo) */
export function mecer(svg: SVGSVGElement, intensidad = 4) {
  if (reducido) return;
  for (let i = 0; i < 8; i++) {
    const paths = tentaculos(svg, i);
    gsap.to(paths, {
      rotation: (i % 2 ? 1 : -1) * intensidad * gsap.utils.random(0.6, 1.2),
      svgOrigin: origenDe(paths[0]),
      duration: gsap.utils.random(1.8, 3.2),
      delay: gsap.utils.random(0, 1),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
  svg.querySelectorAll<SVGGElement>('[data-oreja]').forEach((oreja) => {
    gsap.to(oreja, {
      rotation: Number(oreja.dataset.oreja) * 14,
      svgOrigin: origenDe(oreja),
      duration: 0.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
}

function flotar(el: Element, y = 14, duracion = 3) {
  if (reducido) return;
  gsap.to(el, { y: -y, duration: duracion, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}

/* ---------- Secciones ---------- */

function hero() {
  const pulpo = document.querySelector<HTMLElement>('[data-hero-pulpo]')!;
  const svg = pulpo.querySelector('svg')!;
  mecer(svg, 5);
  if (reducido) return;

  const split = SplitText.create('[data-hero-titulo]', { type: 'words,chars', mask: 'words' });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from(pulpo, { y: 160, opacity: 0, scale: 0.8, duration: 1.6 })
    .from('[data-hero-marca]', { opacity: 0, letterSpacing: '1.2em', duration: 1.4 }, '<0.4')
    .from(split.chars, { yPercent: 110, duration: 0.9, stagger: 0.025, ease: 'back.out(1.7)' }, '<0.2')
    .from(['[data-hero-bajada]', '[data-hero-acciones]'], { y: 24, opacity: 0, duration: 0.9, stagger: 0.15 }, '-=0.5')
    .add(() => flotar(pulpo));

  // Al bajar, el pulpo se hunde más lento que la página
  gsap.to(svg, {
    yPercent: 35,
    scale: 0.85,
    ease: 'none',
    scrollTrigger: { trigger: '#superficie', start: 'top top', end: 'bottom top', scrub: true },
  });
}

function revelar() {
  gsap.utils.toArray<HTMLElement>('[data-revelar]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-zona]').forEach((zona) => {
    const pulpo = zona.querySelector<HTMLElement>('[data-zona-pulpo]')!;
    const svg = pulpo.querySelector('svg')!;
    mecer(svg, 6);
    flotar(pulpo, pulpo.dataset.especie === 'flapjack' ? 6 : 12, gsap.utils.random(2.5, 3.5));

    gsap
      .timeline({ scrollTrigger: { trigger: zona, start: 'top 80%' } })
      .from(zona.querySelectorAll(':scope > div > div:first-child > *'), {
        x: -40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(svg, { y: -120, opacity: 0, scale: 0.6, duration: 1.4, ease: 'power2.out' }, 0);
  });
}

/** Burbujas que suben constantemente */
function burbujas() {
  const capa = document.querySelector<HTMLElement>('[data-burbujas]');
  if (!capa || reducido) return;
  const cantidad = innerWidth < 640 ? 12 : 24;
  for (let i = 0; i < cantidad; i++) {
    const b = document.createElement('span');
    const size = gsap.utils.random(4, 18);
    b.className = 'burbuja';
    Object.assign(b.style, { width: `${size}px`, height: `${size}px`, left: `${gsap.utils.random(0, 100)}%`, top: '0' });
    capa.append(b);
    const dur = gsap.utils.random(9, 20);
    gsap.fromTo(
      b,
      { y: innerHeight + 40, opacity: gsap.utils.random(0.3, 0.7) },
      { y: -40, duration: dur, ease: 'none', repeat: -1, delay: -gsap.utils.random(0, dur) },
    );
    gsap.to(b, { x: gsap.utils.random(-30, 30), duration: gsap.utils.random(1.5, 3), ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }
}

/** Profundímetro: metros según el avance del scroll */
const LIMITES = [0, ...zonas.map((z) => z.profundidad)]; // 0, 200, 1000, 3000, 7000

function profundimetro() {
  const marcador = document.querySelector<HTMLElement>('[data-marcador]');
  const textos = document.querySelectorAll<HTMLElement>('[data-metros]');
  const fmt = new Intl.NumberFormat('es-AR');

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: ({ progress }) => {
      // Cada zona ocupa un cuarto del recorrido, aunque tengan distinto rango de metros
      const tramo = Math.min(progress * zonas.length, zonas.length - 0.0001);
      const i = Math.floor(tramo);
      const metros = LIMITES[i] + (LIMITES[i + 1] - LIMITES[i]) * (tramo - i);
      textos.forEach((t) => (t.textContent = fmt.format(Math.round(metros / 10) * 10)));
      if (marcador) marcador.style.top = `calc(${progress * 100}% - 5px)`;
    },
  });
}

/** Carrusel de océanos con arrastre e inercia */
function carrusel() {
  const cont = document.querySelector<HTMLElement>('[data-carrusel]');
  const pista = cont?.querySelector<HTMLElement>('[data-carrusel-pista]');
  if (!cont || !pista) return;
  const cards = gsap.utils.toArray<HTMLElement>('.oceano-card', pista);

  let snaps: number[] = [];
  const limites = () => {
    const minX = Math.min(0, cont.clientWidth - pista.scrollWidth);
    snaps = cards.map((c) => Math.max(minX, cards[0].offsetLeft - c.offsetLeft));
    return { minX, maxX: 0 };
  };

  const [drag] = Draggable.create(pista, {
    type: 'x',
    inertia: true,
    bounds: limites(),
    edgeResistance: 0.85,
    snap: { x: (v: number) => gsap.utils.snap(snaps, v) },
  });

  addEventListener('resize', () => drag.applyBounds(limites()));

  const mover = (dir: 1 | -1) => {
    const actual = snaps.reduce((m, s, i) => (Math.abs(s - drag.x) < Math.abs(snaps[m] - drag.x) ? i : m), 0);
    const destino = snaps[gsap.utils.clamp(0, snaps.length - 1, actual + dir)];
    gsap.to(pista, { x: destino, duration: 0.8, ease: 'power3.out', onUpdate: () => drag.update() });
  };
  document.querySelector('[data-carrusel-prev]')?.addEventListener('click', () => mover(-1));
  document.querySelector('[data-carrusel-next]')?.addEventListener('click', () => mover(1));

  gsap.from(cards, {
    x: 120,
    opacity: 0,
    duration: 1,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: cont, start: 'top 85%' },
  });
}

/* ---------- Resultados ---------- */

/** El pulpo cambia de especie con un pequeño remolino */
export function cambiarEspecie(svg: SVGSVGElement, especie: string) {
  if (reducido) {
    svg.dataset.especie = especie;
    return gsap.timeline();
  }
  return gsap
    .timeline()
    .to(svg, { scale: 0.4, rotation: -20, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .add(() => {
      svg.dataset.especie = especie;
    })
    .to(svg, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' });
}

/** Los tentáculos se despliegan y cada uno entrega un libro */
export function desplegar(svg: SVGSVGElement, tarjetas: HTMLElement[]) {
  const tl = gsap.timeline({ onComplete: () => mecer(svg, 4) });
  for (let i = 0; i < 8; i++) gsap.killTweensOf(tentaculos(svg, i));
  svg.querySelectorAll('[data-oreja]').forEach((o) => gsap.killTweensOf(o));

  if (reducido) {
    gsap.set(tarjetas, { opacity: 1 });
    return tl;
  }

  tarjetas.forEach((card, i) => {
    const paths = tentaculos(svg, i);
    const lado = Number(paths[0].dataset.lado);
    tl.fromTo(
      paths,
      { rotation: -lado * 35 },
      { rotation: 0, svgOrigin: origenDe(paths[0]), duration: 1.4, ease: 'elastic.out(1, 0.45)' },
      i * 0.12,
    ).fromTo(
      card,
      { opacity: 0, x: -lado * 80, scale: 0.92 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
      i * 0.12 + 0.15,
    );
  });
  return tl;
}

/* ---------- Arranque ---------- */

export async function iniciarMovimiento() {
  iniciarScroll();
  await document.fonts.ready;
  hero();
  revelar();
  burbujas();
  profundimetro();
  carrusel();
  ScrollTrigger.refresh();
}
