export type ChunkArrayFromArray = (data: string[], size: number) => string[][];

export const chunkArrayFromArray: ChunkArrayFromArray = (data, size) => {
  const chunkedArray = [];
  for (let i = 0; i < data.length; i += size) {
    chunkedArray.push(data.slice(i, i + size));
  }
  return chunkedArray;
};
