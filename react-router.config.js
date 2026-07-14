import { cloudflare } from '@react-router/cloudflare'

/** @type {import('@react-router/dev/config').Config} */
export default {
  ssr: true,
  appDirectory: 'src',
  preset: cloudflare(),
}
