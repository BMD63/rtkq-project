type Props = {
  page: number
  setPage: (page: number) => void
  hasNext?: boolean
}

export const usePagination = ({ page, setPage, hasNext }: Props) => {
  const next = () => {
    if (hasNext === false) return
    setPage(page + 1)
  }

  const prev = () => {
    setPage(Math.max(1, page - 1))
  }

  return {
    page,
    next,
    prev,
    canPrev: page > 1,
    canNext: hasNext !== false,
  }
}