import { createRequestHandler } from 'react-router'
import * as build from '../build/server/index.js'

const handler = createRequestHandler(build, 'production')

export default {
  async fetch(request, env, ctx) {
    // Try static assets first (JS, CSS, images, fonts, etc.)
    // Without this, /assets/*.js requests hit React Router which returns 404
    try {
      const assetResponse = await env.ASSETS.fetch(request)
      if (assetResponse.status < 400) return assetResponse
    } catch (_) {}

    // Fall through to SSR for all routes
    return handler(request)
  },
}
