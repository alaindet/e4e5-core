export function chunk<T = any>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  let chunk: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    chunk.push(arr[i]);
    if (chunk.length === chunkSize || i === arr.length - 1) {
      result.push(chunk);
      chunk = [];
    }
  }
  return result;
}
