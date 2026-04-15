import { Skeleton } from '@/shared/ui/Skeleton'

export const PostSkeleton = () => {
  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />

      <Skeleton width="100%" height={14} style={{ marginBottom: 4 }} />

      <Skeleton width="80%" height={14} />
    </div>
  )
}