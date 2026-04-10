import { useState } from 'react'
import type { Post } from '@/entities/post/model/types'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'


export const usePostSearch = (posts: Post[] | undefined) => {
  const [query, setQuery] = useState('')

  const debouncedQuery = useDebounce(query, 300)

  const filteredPosts = (posts ?? []).filter((post) =>
    post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return {
    query,
    setQuery,
    filteredPosts,
  }
}