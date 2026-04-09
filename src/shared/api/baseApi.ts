import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post } from  '@/entities/post/model/types.ts'
export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
    }),
  }),
})

export const { useGetPostsQuery } = baseApi