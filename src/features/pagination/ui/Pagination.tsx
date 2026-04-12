type Props = {
  page: number
  onNext: () => void
  onPrev: () => void
}

export const Pagination = ({ page, onNext, onPrev }: Props) => {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
      <button onClick={onPrev}>Prev</button>
      <span>{page}</span>
      <button onClick={onNext}>Next</button>
    </div>
  )
}