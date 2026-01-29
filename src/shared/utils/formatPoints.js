export function formatPoints(value) {
  if (value == null) return '0'

  return new Intl.NumberFormat('es-AR').format(value)
}
