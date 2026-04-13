import { Row } from '@/shared/ui/Row'
import { usePagination } from '../model/usePagination'

type Props = {
  page: number
  setPage: (page: number) => void
  hasNext?: boolean
}

export const Pagination = (props: Props) => {
  const { page, next, prev, canNext, canPrev } =
    usePagination(props)

  return (
    <Row justify="center" gap={16}>
      <button onClick={prev} disabled={!canPrev}>
        Prev
      </button>

      <span>Page: {page}</span>

      <button onClick={next} disabled={!canNext}>
        Next
      </button>
    </Row>
  )
}