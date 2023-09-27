export type ChunkArrayFromSize = (data: number, size: number) => number[][];

export const chunkArrayFromSize: ChunkArrayFromSize = (data, size) => {
  const numRows = Math.ceil(data / size);
  const chunkedArray: number[][] = [];

  let count = 1;
  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];

    for (let j = 0; j < size; j++) {
      if (count <= data) {
        row.push(count);
      }
      count++;
    }

    chunkedArray.push(row);
  }

  return chunkedArray;
};
