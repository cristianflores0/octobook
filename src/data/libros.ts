import type { Nivel, OceanoId } from './oceanos';

export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  oceano: OceanoId;
  nivel: Nivel;
  /** Lectura corta (aprox. menos de 200 páginas) */
  breve?: boolean;
  resena: string;
}

type Fila = [titulo: string, autor: string, nivel: Nivel, resena: string, breve?: boolean];

const catalogo: Record<OceanoId, Fila[]> = {
  'ciencia-ficcion': [
    ['Fahrenheit 451', 'Ray Bradbury', 0, 'Un bombero que quema libros empieza a preguntarse qué hay adentro de ellos.', true],
    ['El marciano', 'Andy Weir', 0, 'Un astronauta varado en Marte sobrevive a fuerza de ciencia y humor.'],
    ['El juego de Ender', 'Orson Scott Card', 0, 'Un niño prodigio entrenado para una guerra que no termina de entender.'],
    ['Fundación', 'Isaac Asimov', 1, 'Un matemático predice la caída de un imperio galáctico e intenta acortar la oscuridad.'],
    ['1984', 'George Orwell', 1, 'La distopía que nos dejó el Gran Hermano y la neolengua.'],
    ['Crónicas marcianas', 'Ray Bradbury', 1, 'La colonización de Marte contada en relatos poéticos y melancólicos.'],
    ['Dune', 'Frank Herbert', 2, 'Política, ecología y religión en un planeta desierto donde todo gira alrededor de la especia.'],
    ['La mano izquierda de la oscuridad', 'Ursula K. Le Guin', 2, 'Un enviado llega a un mundo helado cuyos habitantes no tienen género fijo.'],
    ['¿Sueñan los androides con ovejas eléctricas?', 'Philip K. Dick', 2, 'Un cazador de androides duda de qué lo hace humano.'],
    ['Neuromante', 'William Gibson', 2, 'La novela fundacional del ciberpunk: hackers, corporaciones y una IA con planes propios.'],
    ['Solaris', 'Stanisław Lem', 3, 'Un océano vivo en un planeta lejano, imposible de comprender. Muy de este sitio.'],
    ['Pícnic junto al camino', 'Arkadi y Borís Strugatski', 3, 'Restos alienígenas abandonados en la Tierra y los stalkers que se arriesgan a buscarlos.', true],
    ['Visión ciega', 'Peter Watts', 3, 'Primer contacto llevado al límite: ¿es necesaria la conciencia para ser inteligente?'],
  ],
  fantasia: [
    ['El hobbit', 'J. R. R. Tolkien', 0, 'Bilbo deja la comodidad de su casa para una aventura con enanos y un dragón.'],
    ['Harry Potter y la piedra filosofal', 'J. K. Rowling', 0, 'Un chico descubre que es mago y entra a Hogwarts.'],
    ['La historia interminable', 'Michael Ende', 0, 'Un lector queda literalmente atrapado dentro del libro que está leyendo.'],
    ['El nombre del viento', 'Patrick Rothfuss', 1, 'Kvothe cuenta su propia leyenda, de músico huérfano a mago.'],
    ['Mistborn: El imperio final', 'Brandon Sanderson', 1, 'Un golpe imposible contra un emperador inmortal, con un sistema de magia ingenioso.'],
    ['Un mago de Terramar', 'Ursula K. Le Guin', 1, 'Un joven mago libera una sombra y tiene que enfrentarla en un archipiélago infinito.', true],
    ['El señor de los anillos', 'J. R. R. Tolkien', 2, 'La épica que definió el género: un anillo, una comunidad y un largo viaje.'],
    ['Juego de tronos', 'George R. R. Martin', 2, 'Intrigas de casas nobles donde nadie está a salvo.'],
    ['Jonathan Strange y el señor Norrell', 'Susanna Clarke', 2, 'Dos magos en la Inglaterra napoleónica, con notas al pie y mucha ironía.'],
    ['La sombra del torturador', 'Gene Wolfe', 3, 'Primer tomo del Libro del Sol Nuevo: un narrador poco confiable en un futuro tan lejano que parece mito.'],
    ['Titus Groan', 'Mervyn Peake', 3, 'Gormenghast, un castillo infinito regido por rituales absurdos y prosa barroca.'],
    ['Pequeño, grande', 'John Crowley', 3, 'Una familia, una casa y el mundo de las hadas que se esconde en sus márgenes.'],
  ],
  policial: [
    ['Y no quedó ninguno', 'Agatha Christie', 0, 'Diez desconocidos en una isla y alguien que los elimina uno por uno.'],
    ['Estudio en escarlata', 'Arthur Conan Doyle', 0, 'Así se conocieron Sherlock Holmes y el doctor Watson.', true],
    ['La chica del tren', 'Paula Hawkins', 0, 'Una mirada por la ventana del tren desata un thriller psicológico.'],
    ['El asesinato de Roger Ackroyd', 'Agatha Christie', 1, 'Un caso de Poirot con uno de los giros más famosos del género.'],
    ['El largo adiós', 'Raymond Chandler', 1, 'Philip Marlowe en Los Ángeles: el policial negro en su mejor forma.'],
    ['Los hombres que no amaban a las mujeres', 'Stieg Larsson', 1, 'Un periodista y una hacker investigan una desaparición de hace décadas.'],
    ['El nombre de la rosa', 'Umberto Eco', 2, 'Crímenes en una abadía medieval y una biblioteca que esconde un secreto.'],
    ['Plata quemada', 'Ricardo Piglia', 2, 'El asalto de 1965 en San Fernando y la fuga a Montevideo, entre crónica y novela.'],
    ['El talento de Mr. Ripley', 'Patricia Highsmith', 2, 'Seguimos de cerca a un asesino encantador. Y lo peor: queremos que se salga con la suya.'],
    ['La trilogía de Nueva York', 'Paul Auster', 3, 'Policiales que se desarman a sí mismos: identidad, azar y escritura.'],
    ['Seis problemas para don Isidro Parodi', 'Borges y Bioy Casares', 3, 'Un detective que resuelve casos desde su celda, con humor y parodia.', true],
    ['La pesquisa', 'Juan José Saer', 3, 'Crímenes en París narrados desde la orilla del Paraná, con la prosa hipnótica de Saer.'],
  ],
  terror: [
    ['Carrie', 'Stephen King', 0, 'La primera novela de King: una adolescente marginada con poderes telequinéticos.', true],
    ['Coraline', 'Neil Gaiman', 0, 'Una puerta lleva a una casa idéntica, con una "otra madre" con botones por ojos.', true],
    ['El fantasma de Canterville', 'Oscar Wilde', 0, 'Un fantasma inglés intenta, sin éxito, asustar a una familia norteamericana.', true],
    ['Drácula', 'Bram Stoker', 1, 'Cartas y diarios que van armando la llegada del conde a Inglaterra.'],
    ['La maldición de Hill House', 'Shirley Jackson', 1, 'Una casa que no quiere que la dejen. Terror psicológico de manual.'],
    ['Frankenstein', 'Mary Shelley', 1, 'El científico, su criatura y la pregunta sobre quién es el verdadero monstruo.'],
    ['El resplandor', 'Stephen King', 1, 'Un hotel aislado en invierno y una familia que se desmorona.'],
    ['Las cosas que perdimos en el fuego', 'Mariana Enríquez', 2, 'Cuentos de terror que nacen de Buenos Aires y sus fantasmas sociales.'],
    ['Distancia de rescate', 'Samanta Schweblin', 2, 'Una conversación febril en una casa de campo. Inquietante hasta la última línea.', true],
    ['Otra vuelta de tuerca', 'Henry James', 2, 'Una institutriz, dos niños y la ambigüedad perfecta: ¿hay fantasmas o no?', true],
    ['En las montañas de la locura', 'H. P. Lovecraft', 2, 'Una expedición antártica encuentra ruinas de una civilización anterior a la humanidad.', true],
    ['La casa de hojas', 'Mark Z. Danielewski', 3, 'Una casa más grande por dentro que por fuera y un libro que se deforma con ella.'],
    ['Nuestra parte de noche', 'Mariana Enríquez', 3, 'Un padre, un hijo médium y una orden oscura a lo largo de la historia argentina.'],
    ['El rey de amarillo', 'Robert W. Chambers', 3, 'Relatos sobre una obra de teatro que enloquece a quien la lee.'],
  ],
  clasicos: [
    ['El principito', 'Antoine de Saint-Exupéry', 0, 'Un aviador, un niño de otro planeta y lo esencial que es invisible a los ojos.', true],
    ['La metamorfosis', 'Franz Kafka', 0, 'Gregor Samsa despierta convertido en un insecto. Su familia, en algo peor.', true],
    ['Rebelión en la granja', 'George Orwell', 0, 'Una fábula sobre cómo las revoluciones se corrompen.', true],
    ['El gran Gatsby', 'F. Scott Fitzgerald', 1, 'Fiestas, dinero y un amor imposible en los años veinte.', true],
    ['Crimen y castigo', 'Fiódor Dostoievski', 1, 'Un estudiante comete un asesinato y su conciencia hace el resto.'],
    ['Madame Bovary', 'Gustave Flaubert', 1, 'Emma sueña con la vida de las novelas y choca con la de provincia.'],
    ['Moby Dick', 'Herman Melville', 2, 'La obsesión del capitán Ahab con la ballena blanca. Lectura obligada para buzos literarios.'],
    ['Ana Karenina', 'León Tolstói', 2, 'Un amor que desafía a la sociedad rusa y un retrato enorme de su época.'],
    ['Don Quijote de la Mancha', 'Miguel de Cervantes', 2, 'El caballero que leyó demasiado. La novela moderna empieza acá.'],
    ['Los hermanos Karamázov', 'Fiódor Dostoievski', 2, 'Un parricidio y tres hermanos que discuten a Dios, la libertad y la culpa.'],
    ['Ulises', 'James Joyce', 3, 'Un día en Dublín contado en todos los estilos posibles.'],
    ['Por el camino de Swann', 'Marcel Proust', 3, 'El inicio de En busca del tiempo perdido, la magdalena y la memoria involuntaria.'],
    ['La montaña mágica', 'Thomas Mann', 3, 'Una visita de tres semanas a un sanatorio en los Alpes que se vuelve siete años.'],
  ],
  romance: [
    ['Bajo la misma estrella', 'John Green', 0, 'Dos adolescentes con cáncer se enamoran entre libros y humor negro.'],
    ['Yo antes de ti', 'Jojo Moyes', 0, 'Una cuidadora y un hombre que perdió las ganas de vivir.'],
    ['Gente normal', 'Sally Rooney', 0, 'Connell y Marianne se acercan y se alejan durante años.'],
    ['Orgullo y prejuicio', 'Jane Austen', 1, 'Elizabeth Bennet, el señor Darcy y la comedia social más ingeniosa.'],
    ['Jane Eyre', 'Charlotte Brontë', 1, 'Una institutriz con voz propia y un secreto en el ático de Thornfield.'],
    ['Como agua para chocolate', 'Laura Esquivel', 1, 'Amor y recetas en el México revolucionario, con realismo mágico.', true],
    ['Buenos días, tristeza', 'Françoise Sagan', 1, 'Un verano en la Riviera y una adolescente que manipula el amor de su padre.', true],
    ['Cumbres borrascosas', 'Emily Brontë', 2, 'Heathcliff y Catherine: un amor feroz que arrasa con dos generaciones.'],
    ['El amor en los tiempos del cólera', 'Gabriel García Márquez', 2, 'Florentino espera más de cincuenta años a Fermina Daza.'],
    ['Expiación', 'Ian McEwan', 2, 'Una mentira infantil separa a dos amantes y la culpa atraviesa la guerra.'],
    ['La edad de la inocencia', 'Edith Wharton', 2, 'El deseo contra las reglas de la alta sociedad neoyorquina.'],
    ['El amante', 'Marguerite Duras', 3, 'Una adolescente y un hombre mayor en la Indochina colonial, en prosa fragmentaria.', true],
    ['Las amistades peligrosas', 'Choderlos de Laclos', 3, 'Seducción como estrategia de guerra, contada en cartas.'],
    ['Fragmentos de un discurso amoroso', 'Roland Barthes', 3, 'El enamoramiento desarmado en figuras, como un diccionario del deseo.'],
  ],
  'no-ficcion': [
    ['Sapiens', 'Yuval Noah Harari', 0, 'La historia de la humanidad contada como una gran aventura de ideas.'],
    ['Cosmos', 'Carl Sagan', 0, 'Un viaje por el universo con el mejor divulgador de la ciencia.'],
    ['Hábitos atómicos', 'James Clear', 0, 'Pequeños cambios que, sumados, transforman la rutina (incluida la de lectura).'],
    ['El gen egoísta', 'Richard Dawkins', 1, 'La evolución vista desde el punto de vista de los genes.'],
    ['A sangre fría', 'Truman Capote', 1, 'El asesinato de una familia en Kansas y el nacimiento de la novela de no ficción.'],
    ['Operación masacre', 'Rodolfo Walsh', 1, 'La investigación sobre los fusilamientos de José León Suárez. Periodismo que hizo historia.', true],
    ['Pensar rápido, pensar despacio', 'Daniel Kahneman', 2, 'Los dos sistemas de nuestra mente y por qué nos equivocamos tanto.'],
    ['Armas, gérmenes y acero', 'Jared Diamond', 2, 'Por qué algunas sociedades conquistaron a otras, según la geografía y la biología.'],
    ['Una habitación propia', 'Virginia Woolf', 2, 'El ensayo sobre mujeres y escritura que sigue siendo actual.', true],
    ['Gödel, Escher, Bach', 'Douglas Hofstadter', 3, 'Matemática, arte y música para preguntarse cómo surge la conciencia.'],
    ['Vigilar y castigar', 'Michel Foucault', 3, 'Del suplicio a la prisión: cómo el poder aprendió a vigilarnos.'],
    ['Tristes trópicos', 'Claude Lévi-Strauss', 3, 'Diario de viaje, antropología y filosofía en el Brasil de los años treinta.'],
  ],
  aventura: [
    ['La isla del tesoro', 'Robert Louis Stevenson', 0, 'Un mapa, un cofre enterrado y Long John Silver, el pirata más carismático de la literatura.', true],
    ['La vuelta al mundo en 80 días', 'Julio Verne', 0, 'Phileas Fogg apuesta su fortuna a dar la vuelta al planeta contra reloj.'],
    ['Las aventuras de Tom Sawyer', 'Mark Twain', 0, 'Travesuras, cuevas y un tesoro a orillas del Misisipi.'],
    ['El llamado de la selva', 'Jack London', 0, 'Buck, un perro doméstico, sobrevive a la fiebre del oro en el Yukón.', true],
    ['Los tres mosqueteros', 'Alejandro Dumas', 1, "D'Artagnan, Athos, Porthos y Aramis: espadas, intrigas y «uno para todos»."],
    ['Veinte mil leguas de viaje submarino', 'Julio Verne', 1, 'A bordo del Nautilus con el capitán Nemo, el viaje más profundo de todos.'],
    ['Robinson Crusoe', 'Daniel Defoe', 1, 'Un náufrago reconstruye su vida en una isla desierta.'],
    ['Sandokán', 'Emilio Salgari', 1, 'El Tigre de Malasia y sus piratas contra el imperio británico.'],
    ['El conde de Montecristo', 'Alejandro Dumas', 2, 'Traicionado y encarcelado, Edmundo Dantès vuelve rico y con un plan de venganza.'],
    ['Las aventuras de Huckleberry Finn', 'Mark Twain', 2, 'Una balsa, un río y una amistad que desafía a toda una sociedad.'],
    ['Kim', 'Rudyard Kipling', 2, 'Un huérfano recorre la India entre lamas, espías y el Gran Juego.'],
    ['El corazón de las tinieblas', 'Joseph Conrad', 3, 'Un viaje río arriba por el Congo hacia el enigmático Kurtz.', true],
    ['Lord Jim', 'Joseph Conrad', 3, 'Un marino marcado por un instante de cobardía busca redimirse en los confines del mundo.'],
    ['Nostromo', 'Joseph Conrad', 3, 'Una mina de plata, una revolución y un héroe incorruptible en una república imaginaria.'],
  ],
};

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const libros: Libro[] = Object.entries(catalogo).flatMap(([oceano, filas]) =>
  filas.map(([titulo, autor, nivel, resena, breve]) => ({
    id: slug(titulo),
    titulo,
    autor,
    oceano: oceano as OceanoId,
    nivel,
    resena,
    breve,
  })),
);
