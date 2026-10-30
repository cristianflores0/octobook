import { libros, type Libro } from '../data/libros';
import { oceanos, type Nivel, type OceanoId } from '../data/oceanos';

export type Frecuencia = 0 | 1 | 2 | 3; // 0: casi nada … 3: lector voraz
export type Busqueda = 'atrapar' | 'desafio' | 'breve' | 'sorpresa';

export interface Respuestas {
  frecuencia: Frecuencia;
  oceanos: OceanoId[];
  /** Cuánto conoce cada océano elegido: 0 nunca se metió … 3 es su hábitat */
  familiaridad: Partial<Record<OceanoId, Nivel>>;
  /** ids de libros del catálogo que ya leyó o está leyendo */
  leidos: string[];
  busqueda: Busqueda;
}

export type Motivo = 'tu-profundidad' | 'descenso' | 'tomar-aire' | 'expedicion';

export interface Recomendacion {
  libro: Libro;
  motivo: Motivo;
}

export const TENTACULOS = 8;

const clamp = (n: number): Nivel => Math.max(0, Math.min(3, Math.round(n))) as Nivel;

/**
 * Profundidad objetivo para un océano. Pesa más lo que sabe del género que
 * cuánto lee en general, y nunca lo deja por encima de lo que ya leyó.
 */
export function profundidadObjetivo(r: Respuestas, oceano: OceanoId): Nivel {
  const fam = r.familiaridad[oceano] ?? 0;
  const base = r.frecuencia * 0.5;
  let d = 0.75 * fam + 0.35 * base;

  const leidosAca = libros.filter((l) => l.oceano === oceano && r.leidos.includes(l.id));
  if (leidosAca.length) d = Math.max(d, Math.max(...leidosAca.map((l) => l.nivel)));

  if (r.busqueda === 'desafio') d += 1;
  return clamp(d);
}

/** Reparte los 8 tentáculos entre los océanos elegidos */
function repartir(cantidad: number, ids: OceanoId[]): Map<OceanoId, number> {
  const out = new Map<OceanoId, number>();
  ids.forEach((id, i) => {
    out.set(id, Math.floor(cantidad / ids.length) + (i < cantidad % ids.length ? 1 : 0));
  });
  return out;
}

function puntaje(libro: Libro, objetivo: Nivel, busqueda: Busqueda) {
  const dif = libro.nivel - objetivo;
  // Preferimos bajar un poco antes que quedarnos en la superficie
  let p = dif >= 0 ? dif * 1 : -dif * 1.4;
  if (busqueda === 'breve' && libro.breve) p -= 0.8;
  return p + Math.random() * 0.3; // un poco de corriente para variar
}

function motivoPara(libro: Libro, objetivo: Nivel): Motivo {
  if (libro.nivel > objetivo) return 'descenso';
  if (libro.nivel < objetivo) return 'tomar-aire';
  return 'tu-profundidad';
}

export function recomendar(r: Respuestas): Recomendacion[] {
  const elegidos = r.oceanos.length ? r.oceanos : oceanos.map((o) => o.id).slice(0, 3);
  const exploracion = r.busqueda === 'sorpresa' ? 2 : 0;
  const cupos = repartir(TENTACULOS - exploracion, elegidos);
  const usados = new Set(r.leidos);
  const resultado: Recomendacion[] = [];

  for (const [oceano, cantidad] of cupos) {
    const objetivo = profundidadObjetivo(r, oceano);
    const candidatos = libros
      .filter((l) => l.oceano === oceano && !usados.has(l.id))
      .map((l) => ({ l, p: puntaje(l, objetivo, r.busqueda) }))
      .sort((a, b) => a.p - b.p)
      .map((c) => c.l);

    const elegidosAca = candidatos.slice(0, cantidad);

    // Con 3 o más tentáculos en un océano, uno siempre invita a bajar un nivel más
    if (cantidad >= 3 && objetivo < 3 && !elegidosAca.some((l) => l.nivel > objetivo)) {
      const masHondo = candidatos.find((l) => l.nivel === objetivo + 1);
      if (masHondo) elegidosAca[elegidosAca.length - 1] = masHondo;
    }

    elegidosAca
      .sort((a, b) => a.nivel - b.nivel)
      .forEach((libro) => {
        usados.add(libro.id);
        resultado.push({ libro, motivo: motivoPara(libro, objetivo) });
      });
  }

  // Expedición: libros de superficie en océanos que todavía no exploró
  if (exploracion) {
    const otros = oceanos
      .map((o) => o.id)
      .filter((id) => !elegidos.includes(id))
      .sort(() => Math.random() - 0.5)
      .slice(0, exploracion);
    for (const oceano of otros) {
      const libro = libros.find((l) => l.oceano === oceano && l.nivel === 0 && !usados.has(l.id));
      if (libro) {
        usados.add(libro.id);
        resultado.push({ libro, motivo: 'expedicion' });
      }
    }
  }

  // Si algún océano se quedó sin libros, completamos con vecinos de nivel similar
  const promedio = clamp(
    elegidos.reduce((s, id) => s + profundidadObjetivo(r, id), 0) / elegidos.length,
  );
  while (resultado.length < TENTACULOS) {
    const libro = libros
      .filter((l) => !usados.has(l.id))
      .sort((a, b) => Math.abs(a.nivel - promedio) - Math.abs(b.nivel - promedio))[0];
    if (!libro) break;
    usados.add(libro.id);
    resultado.push({ libro, motivo: 'expedicion' });
  }

  return resultado.slice(0, TENTACULOS);
}
