import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce } from '@/shared/lib/hooks'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Stack } from '@/shared/ui/Stack'
import { Row } from '@/shared/ui/Row'
import { useInfinitePosts } from '@/features/pagination/model/useInfinitePosts'

export const PostsPage = () => {
  
  // URL
  const [params, setParams] = useSearchParams()
  const search = params.get('q') ?? ''

  // Local state
  const [input, setInput] = useState(search)
  const debounced = useDebounce(input, 300)

  // Data fetching
  const {
    items,
    loadMore,
    isFetching,
    hasMore,
    isError,
  } = useInfinitePosts(debounced)

  
  // debounce → URL
  useEffect(() => {
    setParams((prev) => {
      const current = prev.get('q') ?? ''
      if (current === debounced) return prev

      const next = new URLSearchParams(prev)
      if (debounced) next.set('q', debounced)
      else next.delete('q')
      next.set('page', '1')

      return next
    })
  }, [debounced, setParams])

  // URL → input
  useEffect(() => {
    if (input !== search) {
      setInput(search)
    }
  }, [search, input])

  if (isError) return <div>Error</div>

  if (!items.length && isFetching) {
    return <div>Loading...</div>
  }

  return (
    <Stack>
      <h1>Posts</h1>

      <Row justify="center">
        <CreatePostButton />
        <SearchInput value={input} onChange={setInput} />
      </Row>
      
      {isFetching && items.length > 0 && <div>Loading more...</div>}

      {items.length > 0 && <PostList posts={items} />}

      {hasMore && (
        <button onClick={loadMore}>
          {isFetching ? 'Loading...' : 'Load more'}
        </button>
      )}
    </Stack>
  )
}