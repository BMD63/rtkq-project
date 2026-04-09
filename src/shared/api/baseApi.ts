import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (build) => ({
    getPosts: build.query<any, void>({
      query: () => '/posts',
    }),
  }),
})

export const { useGetPostsQuery } = baseApi