// ** Hooks
import { useState } from 'react'

export const usePagination = (initPerPage: number = 10) => {
  // ** States
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(initPerPage)
  const [totalRows, setTotalRows] = useState<number>(0)
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([5, 10, 15, 20, 25])

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    perPage,
    setPerPage,
    totalRows,
    setTotalRows,
    rowsPerPageOptions,
    setRowsPerPageOptions,
  }
}

export default usePagination
