import { useEffect, useState, useRef, useCallback } from 'react'
import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { useAppDispatch } from '@/shared/lib/hooks'
import { postApi } from '@/entities/post/api/postApi'
import type { Post } from '@/entities/post/model/types'

export const useInfinitePosts = (search: string) => {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  
  // 🔥 Ключ для отслеживания актуального запроса
  const requestRef = useRef<string>(search)
  
  const dispatch = useAppDispatch()

  const {
    data,
    isFetching,
    isError,
    error,
  } = useGetPostsQuery({ search, page })

  // 🔥 1. RESET при смене search (синхронно!)
  useEffect(() => {
    setPage(1)
    setItems([])
    setTotal(0)
    requestRef.current = search  // обновляем ref
  }, [search])

  // 🔥 2. APPEND с проверкой актуальности
  useEffect(() => {
    if (!data) return
    
    // ✅ Защита от stale-данных
    if (requestRef.current !== search) {
      console.log('Ignoring stale data for:', search)
      return
    }

    setTotal(data.total)

    setItems((prev) => {
      // Если страница 1 — полная замена (новый поиск)
      if (page === 1) return data.data
      
      // Иначе append, но проверяем дубликаты
      const existingIds = new Set(prev.map(p => p.id))
      const newItems = data.data.filter(p => !existingIds.has(p.id))
      
      return [...prev, ...newItems]
    })
  }, [data, page, search])

  // 🔥 3. PREFETCH только для актуального поиска
  useEffect(() => {
    if (!data) return
    if (requestRef.current !== search) return  // не prefetch для старого
    if (items.length >= total) return

    const nextPage = page + 1

    dispatch(
      postApi.util.prefetch(
        'getPosts',
        { search, page: nextPage },
        { force: false }
      )
    )
  }, [data, page, search, total, items.length, dispatch])

  const loadMore = useCallback(() => {
    if (isFetching) return  // не даём нажать пока грузится
    setPage(p => p + 1)
  }, [isFetching])

  const hasMore = items.length < total && !isError

  return {
    items,
    loadMore,
    isFetching, 
    isLoading: isFetching && items.length === 0,
    hasMore,
    total,
    isError,
    error,
  }
}