export const calculatePaginationData = (total, page, PerPage) => {
  const totalCounts = total;
  const totalPages = Math.ceil(totalCounts / PerPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  return {
    currentPage: page,
    totalCounts,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
