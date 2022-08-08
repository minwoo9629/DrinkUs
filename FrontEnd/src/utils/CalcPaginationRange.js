const BLOCK_SIZE = 5;
export const CalcPaginationRange = (number, size, totalPages) => {
  const rangeStart =
    parseInt((parseInt(number) - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
  const rangeEnd = Math.min(rangeStart - 1 + BLOCK_SIZE, totalPages);

  const paginationRange = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    paginationRange.push(i);
  }
  return paginationRange;
};
