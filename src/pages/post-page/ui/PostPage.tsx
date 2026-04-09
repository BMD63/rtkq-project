import { useGetPostsQuery, useDeletePostMutation } from '@/shared/api/baseApi'

export const PostsPage = () => {
  const { data, isLoading, isError } = useGetPostsQuery()
  const [deletePost] = useDeletePostMutation()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const handleDelete = async (id: number) => {
    await deletePost(id)
  }

  return (
    <div>
      <h1>Posts</h1>

      {data?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>

          <button onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}