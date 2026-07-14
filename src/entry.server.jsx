import { renderToPipeableStream } from 'react-dom/server'
import { ServerRouter } from 'react-router'
import { PassThrough } from 'node:stream'

const ABORT_DELAY = 5000

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext
) {
  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          const passThrough = new PassThrough()

          const stream = new ReadableStream({
            start(controller) {
              passThrough.on('data', (chunk) => controller.enqueue(chunk))
              passThrough.on('end', () => controller.close())
              passThrough.on('error', (err) => controller.error(err))
            },
          })

          responseHeaders.set('Content-Type', 'text/html; charset=utf-8')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(passThrough)
        },
        onShellError(err) {
          reject(err)
        },
        onError(err) {
          didError = true
          console.error(err)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
