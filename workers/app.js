import { createRequestHandler } from 'react-router'
// Import the already-compiled server bundle (react-router build resolves the virtual module)
import * as build from '../build/server/index.js'

const handler = createRequestHandler(build, 'production')

export default {
  async fetch(request, env, ctx) {
    return handler(request)
  },
}
