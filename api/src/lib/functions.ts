export function generateCodeNumeric(min = 10000, max = 99999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
