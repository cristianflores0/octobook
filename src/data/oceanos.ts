export type Nivel = 0 | 1 | 2 | 3;

export type Especie = 'comun' | 'cristal' | 'flapjack' | 'dumbo';

/**
 * Las profundidades: de lecturas introductorias a obras complejas o de culto.
 * Cada una tiene su pulpo guía, que cambia de especie a medida que bajamos.
 */
export const zonas = [
  {
    nivel: 0,
    nombre: 'Zona epipelágica',
    apodo: 'Superficie',
    metros: '0 – 200 m',
    profundidad: 200,
    descripcion:
      'Aguas claras y con luz. Libros que te atrapan desde la primera página y son la puerta de entrada perfecta a un género.',
    especie: 'comun',
    llegada: 'Te quedaste cerca de la superficie',
    pulpo: 'Pulpo común',
    cientifico: 'Octopus vulgaris',
    estetica:
      'El pulpo clásico y robusto. Camaleónico: cambia de color y textura para imitar rocas y corales, como el lector que prueba de todo.',
  },
  {
    nivel: 1,
    nombre: 'Zona mesopelágica',
    apodo: 'Penumbra',
    metros: '200 – 1.000 m',
    profundidad: 1000,
    descripcion:
      'La luz empieza a apagarse. Clásicos del género y obras con más ambición, ideales cuando ya conocés el terreno.',
    especie: 'cristal',
    llegada: 'Bajaste hasta la penumbra',
    pulpo: 'Pulpo de cristal',
    cientifico: 'Vitreledonella richardi',
    estetica:
      'Transparente y gelatinoso, como una escultura de vidrio flotante: solo se ven sus ojos cilíndricos y su sistema digestivo.',
  },
  {
    nivel: 2,
    nombre: 'Zona batipelágica',
    apodo: 'Medianoche',
    metros: '1.000 – 3.000 m',
    profundidad: 3000,
    descripcion:
      'Oscuridad total. Obras canónicas y exigentes que piden tiempo, atención y algo de experiencia previa.',
    especie: 'flapjack',
    llegada: 'Bajaste hasta la medianoche',
    pulpo: 'Pulpo Flapjack',
    cientifico: 'Opisthoteuthis',
    estetica:
      'Aplanado como un panqueque, con una membrana que une sus tentáculos como un paraguas. Flota como un fantasmita sobre el lecho marino.',
  },
  {
    nivel: 3,
    nombre: 'Zona abisal y hadal',
    apodo: 'Abismo',
    metros: '3.000 – 7.000 m',
    profundidad: 7000,
    descripcion:
      'Donde viven las criaturas más extrañas. Libros experimentales, de culto o monumentales para lectores que ya exploraron mucho.',
    especie: 'dumbo',
    llegada: 'Bajaste hasta el abismo',
    pulpo: 'Pulpo Dumbo',
    cientifico: 'Grimpoteuthis',
    estetica:
      'El rey de las profundidades. Bate sus aletas con forma de orejas para "volar" en la oscuridad; liso, pálido y rosado.',
  },
] as const satisfies readonly {
  nivel: Nivel;
  especie: Especie;
  [k: string]: unknown;
}[];

export const PROFUNDIDAD_MAX = 7000;

export type OceanoId =
  | 'ciencia-ficcion'
  | 'fantasia'
  | 'policial'
  | 'terror'
  | 'clasicos'
  | 'romance'
  | 'no-ficcion'
  | 'latinoamericana';

export interface Oceano {
  id: OceanoId;
  genero: string;
  nombre: string;
  color: string;
  lema: string;
}

/** Cada género literario es un océano. Son ocho, uno por tentáculo. */
export const oceanos: Oceano[] = [
  {
    id: 'ciencia-ficcion',
    genero: 'Ciencia ficción',
    nombre: 'Océano Estelar',
    color: '#5bc0eb',
    lema: 'Futuros posibles, mundos lejanos y preguntas sobre lo humano.',
  },
  {
    id: 'fantasia',
    genero: 'Fantasía',
    nombre: 'Mar de los Mitos',
    color: '#9b7bea',
    lema: 'Magia, viajes épicos y reinos que nunca existieron.',
  },
  {
    id: 'policial',
    genero: 'Policial y misterio',
    nombre: 'Mar de Niebla',
    color: '#c9d1d9',
    lema: 'Crímenes, pistas y detectives que leen entre líneas.',
  },
  {
    id: 'terror',
    genero: 'Terror',
    nombre: 'Fosa Oscura',
    color: '#e5484d',
    lema: 'Lo que acecha en las sombras y lo que nos da miedo mirar.',
  },
  {
    id: 'clasicos',
    genero: 'Clásicos',
    nombre: 'Océano Antiguo',
    color: '#e8c468',
    lema: 'Las obras que siguen hablándonos siglos después.',
  },
  {
    id: 'romance',
    genero: 'Romance',
    nombre: 'Mar de Coral',
    color: '#ff8fab',
    lema: 'Encuentros, desencuentros y todas las formas del amor.',
  },
  {
    id: 'no-ficcion',
    genero: 'No ficción',
    nombre: 'Corriente de lo Real',
    color: '#4cd4a0',
    lema: 'Ciencia, historia, crónica y ensayo para entender el mundo.',
  },
  {
    id: 'latinoamericana',
    genero: 'Literatura latinoamericana',
    nombre: 'Mar del Sur',
    color: '#f5821f',
    lema: 'Realismo mágico, laberintos borgeanos y voces de nuestro continente.',
  },
];

export const oceanoPorId = Object.fromEntries(oceanos.map((o) => [o.id, o])) as Record<OceanoId, Oceano>;
