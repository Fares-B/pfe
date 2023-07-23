export function mostCommonInArray(arr: string[]) {
  if(arr.length === 0) return null;
  if(arr.length === 1) return arr[0];
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
  ).pop();
}