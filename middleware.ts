// Vercel Routing Middleware (Edge runtime). Answers cURL requests in plain text;
// returning nothing lets Vercel serve the static React app.
import timezones from 'tzabbrmap'
import { curlResponse, isCurlRequest } from './src/server/curl.ts'

export const config = {
  matcher: '/((?!assets/).*)'
}

export default function middleware (request: Request): Response | undefined {
  if (!isCurlRequest(request.headers.get('user-agent'))) {
    return undefined
  }
  const url = new URL(request.url)
  const clientTZ = decodeURIComponent(request.headers.get('x-vercel-ip-timezone') ?? '')
  const result = curlResponse(url.pathname, clientTZ, timezones, url.host)
  if (result === null) {
    return undefined
  }
  return new Response(result.body, {
    status: result.status,
    headers: { 'content-type': 'text/plain; charset=utf-8', vary: 'user-agent' }
  })
}
