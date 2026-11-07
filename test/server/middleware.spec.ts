import middleware from '../../middleware'

const request = (path: string, userAgent: string, timezone?: string) =>
  new Request(`https://sharetime.yuvrajthapa.com${path}`, {
    headers: {
      'user-agent': userAgent,
      ...(timezone ? { 'x-vercel-ip-timezone': timezone } : {})
    }
  })

describe('vercel middleware', () => {
  it('lets browsers through to the app', () => {
    expect(middleware(request('/PST/now', 'Mozilla/5.0'))).toBeUndefined()
  })

  it('answers curl with plain text using the Vercel timezone header', async () => {
    const res = middleware(request('/PST/now', 'curl/8.4.0', 'Europe/London'))
    expect(res?.status).toBe(200)
    expect(res?.headers.get('content-type')).toContain('text/plain')
    expect(await res?.text()).toContain('Your timezone detected is Europe/London')
  })

  it('passes static files through for curl', () => {
    expect(middleware(request('/site.webmanifest', 'curl/8.4.0', 'Europe/London'))).toBeUndefined()
  })
})
