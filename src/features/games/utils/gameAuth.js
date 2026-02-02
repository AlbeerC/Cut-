export const safeStartGame = async ({
  user,
  startGameFn,
}) => {
  // Usuario invitado → no hay gameId
  if (!user?.id) {
    return null
  }

  return await startGameFn(user.id)
}
