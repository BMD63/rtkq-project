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
    invalidatesTags: ['Post'],
  }),
  }),
})

export const {
  useGetPostsQuery,
  useDeletePostMutation,
} = baseApi