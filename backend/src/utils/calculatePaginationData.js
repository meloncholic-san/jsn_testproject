export const calculatePaginationData = (count, perPage, page) => {
  const currentPage = Number(page);
  const totalPages = Math.ceil(count / perPage);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    page: currentPage,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
