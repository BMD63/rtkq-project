import { useGetPostsQuery } from '@/shared/api/baseApi'
import type { Post } from '@/entities/post/model/types'

export const PostsPage = () => {
  const { data, isLoading, isError } = useGetPostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>Posts</h1>

      {data?.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}