export type Nivel = 0 | 1 | 2 | 3;

export type Especie = 'comun' | 'cristal' | 'flapjack' | 'dumbo';

/**
 * Las profundidades: de lecturas introductorias a obras complejas o de culto.
 * Cada una tiene su pulpo guía, que cambia de especie a medida que bajamos.
 */
export const zonas = [
  {
    nivel: 0,
    lectura: 'Introductorio',
    lecturaDetalle: 'Libros que atrapan desde la primera página. La puerta de entrada ideal a un género que todavía no conocés.',
    nombre: 'Zona epipelágica',
    apodo: 'Superficie',
    metros: '0 – 200 m',
    profundidad: 200,
    descripcion:
      'Aguas claras y con luz. Libros que te atrapan desde la primera página y son la puerta de entrada perfecta a un género.',
    especie: 'comun',
    perfil: 'Como el pulpo común, sos un lector camaleónico: te adaptás a cualquier historia y te gusta probar de todo. Estos libros son una puerta de entrada clara a cada género, para que descubras qué te atrapa.',
    llegada: 'Te quedaste cerca de la superficie',
    pulpo: 'Pulpo común',
    cientifico: 'Octopus vulgaris',
    estetica:
      'El pulpo clásico y robusto. Camaleónico: cambia de color y textura para imitar rocas y corales, como el lector que prueba de todo.',
  },
  {
    nivel: 1,
    lectura: 'Intermedio',
    lecturaDetalle: 'Clásicos del género y obras con más ambición, para cuando ya sabés qué te gusta.',
    nombre: 'Zona mesopelágica',
    apodo: 'Penumbra',
    metros: '200 – 1.000 m',
    profundidad: 1000,
    descripcion:
      'La luz empieza a apagarse. Clásicos del género y obras con más ambición, ideales cuando ya conocés el terreno.',
    especie: 'cristal',
    perfil: 'Como el pulpo de cristal, ya se te ve por dentro: sabés lo que te gusta y empezás a mirar cómo están hechos los libros. Te esperan clásicos del género y obras con más ambición.',
    llegada: 'Bajaste hasta la penumbra',
    pulpo: 'Pulpo de cristal',
    cientifico: 'Vitreledonella richardi',
    estetica:
      'Transparente y gelatinoso, como una escultura de vidrio flotante: solo se ven sus ojos cilíndricos y su sistema digestivo.',
  },
  {
    nivel: 2,
    lectura: 'Exigente',
    lecturaDetalle: 'Obras canónicas que piden tiempo, atención y algo de experiencia en el género.',
    nombre: 'Zona batipelágica',
    apodo: 'Medianoche',
    metros: '1.000 – 3.000 m',
    profundidad: 3000,
    descripcion:
      'Oscuridad total. Obras canónicas y exigentes que piden tiempo, atención y algo de experiencia previa.',
    especie: 'flapjack',
    perfil: 'Como el Flapjack, te desplegás con calma sobre el fondo: tenés paciencia para obras exigentes que piden tiempo y atención, y que te lo devuelven con creces.',
    llegada: 'Bajaste hasta la medianoche',
    pulpo: 'Pulpo Flapjack',
    cientifico: 'Opisthoteuthis',
    estetica:
      'Aplanado como un panqueque, con una membrana que une sus tentáculos como un paraguas. Flota como un fantasmita sobre el lecho marino.',
  },
  {
    nivel: 3,
    lectura: 'Experto',
    lecturaDetalle: 'Libros experimentales, de culto o monumentales, para quienes ya exploraron mucho.',
    nombre: 'Zona abisal y hadal',
    apodo: 'Abismo',
    metros: '3.000 – 7.000 m',
    profundidad: 7000,
    descripcion:
      'Donde viven las criaturas más extrañas. Libros experimentales, de culto o monumentales para lectores que ya exploraron mucho.',
    especie: 'dumbo',
    perfil: 'Como el Dumbo, aleteás donde pocos llegan: buscás libros raros, experimentales o monumentales, que no se parecen a nada que hayas leído antes.',
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
  | 'aventura';

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
    id: 'aventura',
    genero: 'Aventura',
    nombre: 'Mar de los Piratas',
    color: '#f5821f',
    lema: 'Islas del tesoro, viajes imposibles y héroes que se juegan todo.',
  },
];

export const oceanoPorId = Object.fromEntries(oceanos.map((o) => [o.id, o])) as Record<OceanoId, Oceano>;
