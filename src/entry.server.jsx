import { renderToReadableStream } from 'react-dom/server.browser'
import { ServerRouter } from 'react-router'

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext
) {
  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    { signal: request.signal }
  )

  // Wait for all Suspense / deferred data to resolve so the stream includes
  // the __reactRouterContext.streamController.close() scripts react-router injects.
  await stream.allReady

  const html = await new Response(stream).text()

  responseHeaders.set('Content-Type', 'text/html; charset=utf-8')

  return new Response('<!DOCTYPE html>' + html, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
