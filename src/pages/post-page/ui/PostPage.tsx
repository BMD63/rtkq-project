import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {
  const [params, setParams] = useSearchParams()

  const initialSearch = params.get('search') ?? ''
  const [query, setQuery] = useState(initialSearch)

  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading, isError } = useGetPostsQuery(debouncedQuery)

  useEffect(() => {
    if (debouncedQuery) {
      setParams((prev) => {
        const newParams = new URLSearchParams(prev)

        if (debouncedQuery) {
          newParams.set('search', debouncedQuery)
        } else {
          newParams.delete('search')
        }

        return newParams
      })
          }
  }, [debouncedQuery, setParams])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>Posts</h1>

      <CreatePostButton />

      <SearchInput value={query} onChange={setQuery} />

      {data && <PostList posts={data} />}
    </div>
  )
}