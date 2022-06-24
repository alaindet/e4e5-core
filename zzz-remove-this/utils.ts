export const range = (fromOrTo: number, to?: number): number[] => {
  const result: number[] = [];
  const [inf, sup] = to ? [fromOrTo, to] : [0, fromOrTo];
  for (let i = inf; i <= sup; i++) {
    result.push(i);
  }
  return result;
};

export const chunkArray = <T = any>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  let chunk: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    chunk.push(arr[i]);
    if (chunk.length === chunkSize) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
};
