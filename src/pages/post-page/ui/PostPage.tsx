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
  const initialPage = Number(params.get('page') ?? 1)

  const [query, setQuery] = useState(initialSearch)
  const [page, setPage] = useState(initialPage)

  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading, isError } = useGetPostsQuery({
    search: debouncedQuery,
    page,
  })

  useEffect(() => {
    setParams((prev) => {
      const newParams = new URLSearchParams(prev)

      if (debouncedQuery) {
        newParams.set('search', debouncedQuery)
      } else {
        newParams.delete('search')
      }

      newParams.set('page', String(page))

      return newParams
    })
  }, [debouncedQuery, page, setParams])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>Posts</h1>

      <CreatePostButton />

      <SearchInput value={query} onChange={setQuery} />

      {data && <PostList posts={data} />}

      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
        Prev
      </button>

      <span>Page: {page}</span>

      <button onClick={() => setPage((p) => p + 1)}>
        Next
      </button>
          </div>
        )
      }