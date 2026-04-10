import type { Post } from '../model/types'
import { PostCard } from './PostCard'

interface Props {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}