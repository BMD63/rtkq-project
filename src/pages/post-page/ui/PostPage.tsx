import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useState } from 'react'

export const PostsPage = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const { data, isLoading, isError } = useGetPostsQuery(debouncedQuery)

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