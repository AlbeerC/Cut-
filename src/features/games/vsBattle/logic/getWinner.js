export const getWinner = (movieA, movieB, choice) => {
  return choice === "A" ? movieA : movieB
}