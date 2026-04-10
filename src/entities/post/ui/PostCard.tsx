import type { Post } from '../model/types'
import { DeletePostButton } from '@/features/delete-post/ui/DeletePostButton'

interface Props {
  post: Post
}

export const PostCard = ({ post }: Props) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      
      <DeletePostButton id={post.id} />
    </div>
  )
}