interface Props {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <input
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}