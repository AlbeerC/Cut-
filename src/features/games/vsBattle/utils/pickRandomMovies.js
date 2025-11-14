export const pickRandomMovies = (movies, amount) => {
  const shuffled = [...movies].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, amount)
}