export function generateRandomColor() {
  const hueValue = Math.round(Math.random() * 360)
  const color = `hsl(${hueValue}, 100%, 50%)`
  return color
}
