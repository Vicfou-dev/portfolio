import { createRequestHandler } from 'react-router'

// Cloudflare Workers fetch handler — used by wrangler deploy
export default {
  async fetch(request, env, ctx) {
    const handler = createRequestHandler(
      () => import('virtual:react-router/server-build'),
      import.meta.env.MODE
    )
    return handler(request)
  },
}
