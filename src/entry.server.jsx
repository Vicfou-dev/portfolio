import { createRequestHandler } from '@react-router/cloudflare'
import * as build from 'virtual:react-router/server-build'

export default {
  async fetch(request, env, ctx) {
    const handler = createRequestHandler(build, import.meta.env.MODE)
    return handler(request, { cloudflare: { env, ctx } })
  },
}
