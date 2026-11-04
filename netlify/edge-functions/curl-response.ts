// Netlify Edge Function (Deno). Answers cURL requests in plain text; everything
// else falls through to the static React app.
import type { Config, Context } from 'https://edge.netlify.com'
import timezones from 'https://cdn.jsdelivr.net/npm/tzabbrmap@1.0.0/index.json' with { type: 'json' }
import { curlResponse, isCurlRequest, type TimezoneMap } from '../../src/server/curl.ts'

export default (request: Request, context: Context) => {
  if (!isCurlRequest(request.headers.get('user-agent'))) {
    return
  }
  const url = new URL(request.url)
  const result = curlResponse(url.pathname, context.geo.timezone ?? '', timezones as TimezoneMap, url.host)
  if (result === null) {
    return
  }
  return new Response(result.body, {
    status: result.status,
    headers: { 'content-type': 'text/plain; charset=utf-8', vary: 'user-agent' }
  })
}

export const config: Config = {
  path: '/*',
  excludedPath: ['/assets/*']
}
