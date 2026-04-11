type SearchKey = {
  search: string
  page: number
}

const searchCache = new Set<string>()
const makeKey = (key: SearchKey) =>
  JSON.stringify(key)

export const addSearchKey = (key: SearchKey) => {
  searchCache.add(makeKey(key))
}

export const getSearchKeys = () => {
  return Array.from(searchCache).map((k) => JSON.parse(k) as SearchKey)
}