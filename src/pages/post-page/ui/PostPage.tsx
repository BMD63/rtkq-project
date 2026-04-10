import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'

export const PostsPage = () => {
  const { data, isLoading, isError } = useGetPostsQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>Posts</h1>

      <CreatePostButton />

      {data && <PostList posts={data} />}
    </div>
  )
}