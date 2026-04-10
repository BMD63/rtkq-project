import { useCreatePostMutation } from '@/entities/post/api/postApi'

export const CreatePostButton = () => {
  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleClick = () => {
    createPost({
      title: 'New post',
      body: 'Some text',
      userId: 1,
    })
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      Add Post
    </button>
  )
}