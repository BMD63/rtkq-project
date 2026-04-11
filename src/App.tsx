import { Routes, Route } from 'react-router-dom'
import { PostsPage } from '@/pages/post-page/ui/PostPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
    </Routes>
  )
}
