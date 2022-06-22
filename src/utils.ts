export const range = (fromOrTo: number, to?: number): number[] => {
  const result: number[] = [];
  const [inf, sup] = to ? [fromOrTo, to] : [0, fromOrTo];
  for (let i = inf; i <= sup; i++) {
    result.push(i);
  }
  return result;
};
