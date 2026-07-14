import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.jsx'),
  route('case/yomimanga', 'routes/case.yomimanga.jsx'),
  route('blog', 'routes/blog._index.jsx'),
  route('blog/:slug', 'routes/blog.$slug.jsx'),
]
