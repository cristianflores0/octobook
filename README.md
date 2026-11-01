# Octobook 🐙

**Sumergite en la lectura.** Octobook es un sitio que te guía en tu aventura literaria: respondés unas preguntas sobre cuánto leés, qué te gusta y qué ya leíste, y el pulpo te recomienda **ocho libros**, uno por tentáculo, a la profundidad justa para vos.

## El concepto

- **Cada género literario es un océano.** Hay ocho: ciencia ficción, fantasía, policial y misterio, terror, clásicos, romance, no ficción y aventura.
- **Cada océano tiene cuatro profundidades**, de lecturas introductorias a obras complejas o de culto. A medida que hacés scroll el agua se oscurece y el profundímetro marca cuántos metros bajaste.
- **El pulpo es el guía**, y cambia de especie según la profundidad:

| Nivel | Zona | Profundidad | Pulpo guía |
| --- | --- | --- | --- |
| 1 | Superficie (epipelágica) | 0 – 200 m | Pulpo común (*Octopus vulgaris*) |
| 2 | Penumbra (mesopelágica) | 200 – 1.000 m | Pulpo de cristal (*Vitreledonella richardi*) |
| 3 | Medianoche (batipelágica) | 1.000 – 3.000 m | Pulpo Flapjack (*Opisthoteuthis*) |
| 4 | Abismo (abisal y hadal) | 3.000 – 7.000 m | Pulpo Dumbo (*Grimpoteuthis*) |

## Stack

- [Astro](https://astro.build) 6 (sitio estático)
- [Tailwind CSS](https://tailwindcss.com) 4
- [GSAP](https://gsap.com) con ScrollTrigger (apariciones al hacer scroll), Draggable + InertiaPlugin (carrusel con arrastre) y SplitText (intro del hero)
- [Lenis](https://lenis.darkroom.engineering) (scroll suave)

## Cómo correrlo

Necesitás **Node 22.12 o superior**.

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:4321
npm run build     # genera el sitio estático en dist/
npm run preview   # sirve el build para probarlo
```

## Estructura

```
src/
├── pages/index.astro         # la página: arma todas las secciones
├── layouts/Layout.astro      # <head>, fuentes y estilos globales
├── components/
│   ├── Octopus.astro         # el isologotipo como SVG animable (8 tentáculos + especies)
│   ├── Hero.astro            # superficie: logo, título y olas
│   ├── Zonas.astro           # cómo funciona: pasos, niveles y la curiosidad de los pulpos
│   ├── Oceanos.astro         # carrusel arrastrable de los ocho océanos
│   ├── Quiz.astro            # el cuestionario de inmersión (5 pasos)
│   ├── Resultados.astro      # los ocho tentáculos con sus libros
│   ├── Profundimetro.astro   # medidor de metros fijo
│   └── Pie.astro
├── data/
│   ├── oceanos.ts            # géneros, profundidades y especies de pulpo
│   └── libros.ts             # catálogo de libros por océano y nivel
├── scripts/
│   ├── main.ts               # punto de entrada
│   ├── motion.ts             # Lenis + GSAP: animaciones, carrusel, burbujas
│   ├── quiz.ts               # lógica del cuestionario y armado de resultados
│   └── recomendar.ts         # el motor de recomendación
└── styles/global.css         # paleta, estilos del pulpo y de cada especie
```

## Cómo recomienda el pulpo

El cuestionario pregunta:

1. Cuánto leés por año.
2. Qué océanos te atraen (hasta tres).
3. Cuánto conocés cada uno.
4. Qué libros leíste o estás leyendo.
5. Qué buscás ahora: algo que te atrape, un desafío, algo breve o una sorpresa.

Con eso, [`recomendar.ts`](src/scripts/recomendar.ts) calcula una **profundidad objetivo** para cada océano. Pesa más lo que conocés del género que cuánto leés en general, y los libros que ya leíste funcionan como piso de tu nivel. Después reparte los ocho tentáculos entre los océanos elegidos:

- Los libros que ya leíste nunca se repiten.
- Si un océano recibe tres tentáculos o más, uno siempre te invita a **bajar un nivel**.
- "Un desafío" suma un nivel, "Algo breve" prioriza lecturas cortas y "Sorprendeme" reserva dos tentáculos para océanos que no elegiste.

El guía que aparece en los resultados es la especie de la profundidad promedio a la que llegaste.

## Editar el contenido

- **Libros:** en [`src/data/libros.ts`](src/data/libros.ts), cada fila es `[título, autor, nivel (0–3), reseña, breve?]`, agrupadas por océano.
- **Océanos, zonas y especies:** en [`src/data/oceanos.ts`](src/data/oceanos.ts).
- **Colores y estilos de cada especie de pulpo:** en [`src/styles/global.css`](src/styles/global.css).

## Paleta

| Color | Hex |
| --- | --- |
| Azul | `#17459b` |
| Naranja | `#f5821f` |
| Espuma (fondo claro) | `#dbe8f8` |

## Deploy

Es un sitio estático, así que se puede deployar en Vercel, Netlify o cualquier hosting de archivos. En Vercel alcanza con importar el repo (detecta Astro solo) o correr `npx vercel`.

## Accesibilidad

Si el sistema tiene activado "reducir movimiento" (`prefers-reduced-motion`), el sitio desactiva el scroll suave, las burbujas y las animaciones continuas.
