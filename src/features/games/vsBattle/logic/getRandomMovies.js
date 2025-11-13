export const getRandomMovies = (movies) => {
  const randomIndexes = []
  while (randomIndexes.length < 2) {
    const rand = Math.floor(Math.random() * movies.length)
    if (!randomIndexes.includes(rand)) randomIndexes.push(rand)
  }
  return [movies[randomIndexes[0]], movies[randomIndexes[1]]]
}