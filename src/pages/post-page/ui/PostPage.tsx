import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { usePostSearch } from '@/features/search-post/model/usePostSearch'
import { SearchInput } from '@/features/search-post/ui/SearchInput'

export const PostsPage = () => {
  const { data, isLoading, isError } = useGetPostsQuery()
  
  const {
  query,
  setQuery,
  filteredPosts,
} = usePostSearch(data)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>Posts</h1>

      <CreatePostButton />

      <SearchInput value={query} onChange={setQuery} />

      <PostList posts={filteredPosts} />

    </div>
  )
}