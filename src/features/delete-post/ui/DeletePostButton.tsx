import { useDeletePostMutation } from '@/entities/post/api/postApi'

interface Props {
  id: number
}

export const DeletePostButton = ({ id }: Props) => {
  const [deletePost, { isLoading }] = useDeletePostMutation()

  return (
    <button onClick={() => deletePost(id)} disabled={isLoading}>
      Delete
    </button>
   
  )
}