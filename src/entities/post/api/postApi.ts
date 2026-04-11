import { baseApi } from '@/shared/api/baseApi'
import type { Post } from '../model/types'

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], string>({
      query: (search = '') => ({
        url: '/posts',
        params: search ? { q: search } : {},
      }),

      providesTags: (result) =>
        result
          ? [
              { type: 'Post', id: 'LIST' } as const,
              ...result.map((post) => ({ type: 'Post', id: post.id } as const)),
            ]
          : [{ type: 'Post', id: 'LIST' } as const],
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
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPosts', undefined, (draft) => {
            return draft.filter((post) => post.id !== id)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
          postApi.util.updateQueryData('getPosts', undefined, (draft) => {
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