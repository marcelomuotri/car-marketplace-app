export const formatNumber = (number) => {
  if (!number) return
  return new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)
}

export function capitalizeFirstLetter(string) {
  if (string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1)
  }
}
