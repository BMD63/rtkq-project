import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostList } from '@/entities/post/ui/PostList'
import { CreatePostButton } from '@/features/create-post/ui/CreatePostButton'
import { SearchInput } from '@/features/search-post/ui/SearchInput'
import { useDebounce, useAppDispatch} from '@/shared/lib/hooks'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Stack } from '@/shared/ui/Stack'
import { Row } from '@/shared/ui/Row'
import { Pagination } from '@/features/pagination/ui/Pagination'
import { postApi } from '@/entities/post/api/postApi'

export const PostsPage = () => {
  const [params, setParams] = useSearchParams()
  const search = params.get('q') ?? ''
  const page = Number(params.get('page') ?? 1)

  const setPage = (value: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(value))
      return next
    })
}

  const dispatch = useAppDispatch()

  const [input, setInput] = useState(search)
  const debounced = useDebounce(input, 300)

  const { data, isLoading, isError, isFetching } = useGetPostsQuery({
    search, // ✅ из URL
    page,
  })

    // debounce → URL
  useEffect(() => {
    setParams((prev) => {
      const current = prev.get('q') ?? ''

      if (current === debounced) return prev

      const next = new URLSearchParams(prev)

      if (debounced) {
        next.set('q', debounced)
      } else {
        next.delete('q')
      }

      next.set('page', '1')

      return next
    })
  }, [debounced])

  // URL → input
  useEffect(() => {
    if (input !== search) {
      setInput(search)
    }
  }, [search])

  const posts = data?.data ?? []
  const total = data?.total ?? 0

  const totalPages = Math.ceil(total / 10)
  const hasNext = page < totalPages

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  // Prefetch

  useEffect(() => {
    if (!hasNext) return

    const nextPage = page + 1

    dispatch(
      postApi.util.prefetch('getPosts', {
        search,
        page: nextPage,
      }, 
      { force: false })
    )
  }, [page, search, hasNext, dispatch])

  return (
    <Stack>
      <h1>Posts</h1>

      <Row justify="center">
        <CreatePostButton />
        <SearchInput value={input} onChange={setInput} />
      </Row>
      
      {isFetching && <div>Updating...</div>}

      {data && <PostList posts={posts} />}

      <Pagination
        page={page}
        setPage={setPage}
        hasNext={hasNext}
      />
      
      
    </Stack>
  )
      }