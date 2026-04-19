import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { PostSkeletonList } from '@/entities/post/ui/PostSkeletonList'
import { useDebounce, useIntersection } from '@/shared/lib/hooks'
import { useSearchParams } from 'react-router-dom'
import { Stack } from '@/shared/ui/Stack'
import { Row } from '@/shared/ui/Row'
import { useInfinitePosts } from '@/features/pagination/model/useInfinitePosts'
import { useCallback } from 'react'

export const PostsPage = () => {
  const [params, setParams] = useSearchParams()
  
  // 🔥 ЕДИНСТВЕННЫЙ источник правды — URL
  const search = params.get('q') ?? ''
  
  // 🔥 Debounce применяем прямо к URL-значению
  const debouncedSearch = useDebounce(search, 300)
  
  // Data fetching (уже зависит от debouncedSearch)
  const {
    items,
    loadMore,
    isFetching,
    hasMore,
    isError,
  } = useInfinitePosts(debouncedSearch)

  // 🔥 Обновляем URL через callback — никаких эффектов
  const handleSearchChange = useCallback((newSearch: string) => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      
      if (newSearch) {
        next.set('q', newSearch)
      } else {
        next.delete('q')
      }
      
      // Сброс пагинации при новом поиске
      next.set('page', '1')
      
      return next
    })
  }, [setParams])

  const loadMoreRef = useIntersection(loadMore, hasMore)

  // Обработка ошибок и состояний загрузки
  if (isError) {
    return <div>Error loading posts</div>
  }

  if (!items.length && isFetching) {
    return <PostSkeletonList count={5} />
  }

  return (
    <Stack>
      <h1>Posts</h1>

      <Row justify="center">
        <CreatePostButton />
        
        {/* 🔥 Прямая связь: value из URL, onChange в URL */}
        <SearchInput 
          value={search}  // ← берем из URL, не из локального state
          onChange={handleSearchChange}
        />
      </Row>
      
      {isFetching && <div>Loading more...</div>}

      {items.length > 0 && <PostList posts={items} />}

      {isFetching && items.length > 0 && (
        <PostSkeletonList count={3} />
      )}    
      
      <div ref={loadMoreRef} />
    </Stack>
  )
}