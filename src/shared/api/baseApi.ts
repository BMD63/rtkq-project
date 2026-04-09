import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post } from  '@/entities/post/model/types.ts'
export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    deletePost: build.mutation<void, number>({
    query: (id) => ({
      url: `/posts/${id}`,
      method: 'DELETE',
    }),
    async onQueryStarted(id, { dispatch, queryFulfilled }) {
    // 1. оптимистично обновляем кеш
      const patchResult = dispatch(
        baseApi.util.updateQueryData('getPosts', undefined, (draft) => {
          return draft.filter((post) => post.id !== id)
        })
      )

      try {
        // 2. ждём реальный запрос
        await queryFulfilled
      } catch {
        // 3. если ошибка — откатываем
        patchResult.undo()
      }
    },
  }),
  }),
})

export const {
  useGetPostsQuery,
  useDeletePostMutation,
} = baseApi