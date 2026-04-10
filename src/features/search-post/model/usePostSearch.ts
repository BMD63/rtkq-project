import { useState } from 'react'
import type { Post } from '@/entities/post/model/types'

export const usePostSearch = (posts: Post[] | undefined) => {
  const [query, setQuery] = useState('')

  const filteredPosts = (posts ?? []).filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  )

  return {
    query,
    setQuery,
    filteredPosts,
  }
}