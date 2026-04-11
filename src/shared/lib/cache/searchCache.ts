const searchCache = new Set<string>()

export const addSearchKey = (key: string) => {
  searchCache.add(key)
}

export const getSearchKeys = () => {
  return Array.from(searchCache)
}