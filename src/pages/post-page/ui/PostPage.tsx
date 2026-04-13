import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Stack } from '@/shared/ui/Stack'
import { Row } from '@/shared/ui/Row'
import { Pagination } from '@/features/pagination/ui/Pagination'

export const PostsPage = () => {
  const [params, setParams] = useSearchParams()

  const initialSearch = params.get('search') ?? ''
  const initialPage = Number(params.get('page') ?? 1)
  const [page, setPage] = useState(initialPage)
  const [query, setQuery] = useState(initialSearch)


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
    if (page !== 1) setPage(1)
  }, [query])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Stack>
      <h1>Posts</h1>

      <Row justify="center">
        <CreatePostButton />
        <SearchInput value={query} onChange={setQuery} />
      </Row>
      
      {isFetching && <div>Updating...</div>}

      {data && <PostList posts={data} />}

      <Pagination
        page={page}
        setPage={setPage}
      />
      
      
    </Stack>
  )
      }