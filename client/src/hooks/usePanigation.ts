import { useState } from "react";

const usePanigation = (currentPage: number) => {
  const [rowsPerPage, setRowPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(currentPage);
  const changePage = (page: number) => setPage(page);
  const changeRowPerPage = (row: number) => setRowPerPage(row);
  return { rowsPerPage, page, changePage, changeRowPerPage };
};

export default usePanigation;
