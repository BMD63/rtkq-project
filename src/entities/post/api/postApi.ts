import { baseApi } from '@/shared/api/baseApi'
import type { Post } from '../model/types'
import { addSearchKey, getSearchKeys } from '@/shared/lib/cache/searchCache'

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], { search: string; page: number }>({
      query: ({ search, page }) => ({
        url: '/posts',
        params: {
          q: search || undefined,
          _page: page,
          _limit: 10,
        },
      }),
      async onQueryStarted(
        { search, page }, 
        { queryFulfilled }) 
        {
          try {
            await queryFulfilled
            addSearchKey({search, page }) // 🔥 сохраняем ключ
          } catch {}
        },

      providesTags: (result, _error, search) =>
        result
          ? [
              { type: 'Post', id: `LIST-${search}` } as const,
              ...result.map((post) => ({
                type: 'Post',
                id: `${post.id}-${search}`,
              }) as const),
            ]
          : [{ type: 'Post', id: `LIST-${search}` } as const],
    }),

    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (_, __, id) => [
        { type: 'Post', id } as const,
      ],

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const searchKeys = getSearchKeys()

        // 🔥 обновляем ВСЕ кеши
        const patches = searchKeys.map(({ search, page }) =>
          dispatch(
            postApi.util.updateQueryData(
              'getPosts',
              { search, page },
              (draft: Post[]) => {
                return draft.filter((post) => post.id !== id)
              }
            )
          )
        )

        try {
          await queryFulfilled
        } catch {
          // 🔥 откат всех кешей
          patches.forEach((patch) => patch.undo())
        }
      }
    }),

    createPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),

      invalidatesTags: [{ type: 'Post', id: 'LIST' } as const],

      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData(
            'getPosts', 
            { search: '', page: 1 }, 
            (draft) => {
            draft.unshift({
              id: Date.now(),
              userId: newPost.userId ?? 1,
              title: newPost.title ?? '',
              body: newPost.body ?? '',
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
} = postApi