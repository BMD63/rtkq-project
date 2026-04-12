import {useState} from 'react'

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage)

  const next = () => setPage((p) => p + 1)
  const prev = () => setPage((p) => Math.max(1, p - 1))

  return {
    page,
    next,
    prev,
    setPage,
  }
}