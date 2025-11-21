Seis Saltos (Conexión Actor-Actor)

Aquí sí TMDB te lo da TODO: actores, cast completos y filmografías.

✔️ Cómo implementar la conexión usando TMDB:

Usuario recibe:
Actor A → Actor B

Haces llamadas a:

/person/{id}/movie_credits (cast)

Construyes un grafo simple:

Nodos: actores

Conexiones: película compartida

Tu sistema hace una búsqueda tipo BFS para encontrar el camino más corto.

Ejemplo de conexión:

Brad Pitt → Samuel L. Jackson

Brad Pitt estuvo en “Inglourious Basterds”

con Michael Fassbender

que estuvo en “X-Men: First Class”

con James McAvoy

que estuvo en “Glass”

con Samuel L. Jackson

🎮 Mecánica:

El usuario intenta adivinar la ruta con el menor número de pasos.

Luego comparas su resultado con la solución óptima generada por tu algoritmo.

Puedes poner límite: 6 pasos.

🧩 Variante:

Conexión Película → Película (a través de actores en común)

Conexión Director → Actor




Cronologías Incompletas (Sagas / Filmografías)

Modo  Cronologías “con huecos”

Usas sagas, directores o actores.

Ejemplo:

Tomas filmografía de Denis Villeneuve.

Seleccionas 6 películas.

Ocultas una → usuario debe decir cuál falta.

Muestras esto:

1995 – Película A
1999 – [ ??? ]
2003 – Película B
2007 – Película C

Opciones:

Película X (1997)

Película Y (1999)

Película Z (2002)



5️⃣ Ejemplos concretos
🎬 Ejemplo 1 — Saga

John Wick Collection

2014 – John Wick
2017 – John Wick 2
2019 – [ ??? ]
2023 – John Wick 4

Opciones:

Sicario

John Wick 3

Atomic Blonde

Nobody

Correcta: John Wick 3

🎬 Ejemplo 2 — Director

Christopher Nolan Filmografía

2000 – Memento
2005 – Batman Begins
2008 – [ ??? ]
2010 – Inception
2014 – Interstellar

Opciones:

Insomnia

Dunkirk

The Dark Knight

Tenet

Correcta: The Dark Knight

🎬 Ejemplo 3 — Género

Sci-Fi Cronología

1991 – Terminator 2
1999 – The Matrix
2009 – [ ??? ]
2014 – Interstellar

Opciones:

Avatar

Elysium

The Martian

Oblivion

Correcta: Avatar