import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {usePagination } from '@/features/pagination/model/usePagination'
import { Stack } from '@/shared/ui/Stack'
import { Row } from '@/shared/ui/Row'
import { Pagination } from '@/features/pagination/ui/Pagination'

export const PostsPage = () => {
  const [params, setParams] = useSearchParams()

  const initialSearch = params.get('search') ?? ''
  const initialPage = Number(params.get('page') ?? 1)

  const [query, setQuery] = useState(initialSearch)
  const { setPage, page, next, prev } = usePagination(initialPage)

  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading, isError, isFetching } = useGetPostsQuery({
    search: debouncedQuery,
    page,
  })



  useEffect(() => {
    const newParams = new URLSearchParams()

      if (debouncedQuery) {
        newParams.set('search', debouncedQuery)
      }

      newParams.set('page', String(page))

      setParams(newParams)
    }, [debouncedQuery, page, setParams])

  useEffect(() => {
    setPage(1)
  }, [query])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Stack>
      <h1>Posts</h1>

      <Row>
        <CreatePostButton />
        <SearchInput value={query} onChange={setQuery} />
      </Row>
      
      {isFetching && <div>Updating...</div>}

      {data && <PostList posts={data} />}

      <Pagination page={page} onNext={next} onPrev={prev} />
      
      
    </Stack>
  )
      }