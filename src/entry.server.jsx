import { renderToString } from 'react-dom/server'
import { ServerRouter } from 'react-router'

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext
) {
  const html = renderToString(
    <ServerRouter context={routerContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html; charset=utf-8')

  return new Response('<!DOCTYPE html>' + html, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
