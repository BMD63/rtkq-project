import { PostSkeleton } from './PostSkeleton'

type Props = {
  count?: number
}

export const PostSkeletonList = ({ count = 5 }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </>
  )
}