const apiKey = '39b2e40c3e6799bd583ea7fbd7188df1';  // Reemplaza con tu clave de API
export const actorsPool = [
  { id: 287, name: "Brad Pitt" },
  { id: 6193, name: "Leonardo DiCaprio" },
  { id: 500, name: "Tom Cruise" },
  { id: 31, name: "Tom Hanks" },
  { id: 1245, name: "Scarlett Johansson" },
  { id: 2231, name: "Samuel L. Jackson" },
  { id: 30614, name: "Ryan Gosling" },
  { id: 74568, name: "Chris Hemsworth" },
  { id: 6384, name: "Keanu Reeves" },
  { id: 3894, name: "Christian Bale" },
  { id: 85, name: "Johnny Depp" },
  { id: 234352, name: "Margot Robbie" },
  { id: 62, name: "Bruce Willis" },
  { id: 3, name: "Harrison Ford" },
  { id: 192, name: "Morgan Freeman" },
  { id: 1813, name: "Anne Hathaway" },
  { id: 524, name: "Natalie Portman" },
  { id: 131, name: "Jake Gyllenhaal" },
  { id: 6968, name: "Hugh Jackman" },
  { id: 5064, name: "Meryl Streep" },
  { id: 380, name: "Robert De Niro" },
  { id: 2524, name: "Tom Hardy" },
  { id: 73421, name: "Joaquin Phoenix" },
  { id: 505710, name: "Zendaya" },
  { id: 2227, name: "Nicole Kidman" },
  { id: 5081, name: "Emily Blunt" },
  { id: 135651, name: "Michael B. Jordan" },
  { id: 5292, name: "Denzel Washington" },
  { id: 1892, name: "Matt Damon" },
  { id: 3223, name: "Robert Downey Jr." },
  { id: 1038, name: "Jodie Foster" },
  { id: 4587, name: "Halle Berry" },
  { id: 16828, name: "Chris Evans" },
  { id: 880, name: "Ben Affleck" },
  { id: 54693, name: "Emma Stone" },
  { id: 72129, name: "Jennifer Lawrence" },
  { id: 206, name: "Jim Carrey" },
  { id: 2157, name: "Robin Williams" },
  { id: 190, name: "Clint Eastwood" },
  { id: 1158, name: "Al Pacino" },
  { id: 819, name: "Edward Norton" },
  { id: 22226, name: "Paul Rudd" },
  { id: 2888, name: "Will Smith" },
  { id: 112, name: "Cate Blanchett" },
  { id: 204, name: "Kate Winslet" },
  { id: 103, name: "Mark Ruffalo" },
  { id: 117642, name: "Jason Momoa" },
  { id: 1397778, name: "Anya Taylor-Joy" },
  { id: 53714, name: "Rachel McAdams" }
];


async function checkActorIds() {
  const baseUrl = 'https://api.themoviedb.org/3/person/';
  
  for (let actor of actorsPool) {
    const url = `${baseUrl}${actor.id}?api_key=${apiKey}&language=en-US`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status_code && data.status_code === 34) {
        console.log(`Actor with ID ${actor.id} (${actor.name}) not found.`);
      } else {
        // Verificar que el nombre del actor coincida
        if (data.name.toLowerCase() === actor.name.toLowerCase()) {
          console.log(`Actor with ID ${actor.id} (${actor.name}) is correct.`);
        } else {
          console.log(`ID ${actor.id} does not match ${actor.name}. It corresponds to ${data.name}.`);
        }
      }
    } catch (error) {
      console.error(`Error fetching data for actor with ID ${actor.id}:`, error);
    }
  }
}

checkActorIds();