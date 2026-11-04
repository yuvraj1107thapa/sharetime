import tzabbrmap from 'tzabbrmap'
import { curlResponse, isCurlRequest } from '@/server/curl'

const HOST = 'sharetime.yuvrajthapa.com'
// 2026-07-15 12:00 UTC
const NOW = Date.UTC(2026, 6, 15, 12, 0)

const respond = (path: string, clientTZ = 'Asia/Kolkata') => curlResponse(path, clientTZ, tzabbrmap, HOST, NOW)

describe('isCurlRequest', () => {
  it('detects curl user agents', () => {
    expect(isCurlRequest('curl/8.4.0')).toBe(true)
    expect(isCurlRequest('Mozilla/5.0')).toBe(false)
    expect(isCurlRequest(null)).toBe(false)
  })
})

describe('curlResponse', () => {
  it('prints usage on the root path', () => {
    const res = respond('/')
    expect(res?.status).toBe(200)
    expect(res?.body).toContain(`curl ${HOST}/PST/now`)
  })

  it('passes static files through', () => {
    expect(respond('/site.webmanifest')).toBeNull()
  })

  it('shows the current time for an abbreviation', () => {
    const res = respond('/PST/now')
    expect(res?.body).toBe(
      'Your timezone detected is Asia/Kolkata\n' +
      'Time right now in (PST) America/Los_Angeles is 05:00 AM \n'
    )
  })

  it('converts a time for an abbreviation', () => {
    const res = respond('/PST/6pm')
    expect(res?.body).toContain('6pm in (PST) America/Los_Angeles at your timezone will be 06:30 AM (+1 day) \n')
  })

  it('converts a time for an IANA zone', () => {
    const res = respond('/Europe/Berlin/18:30', 'Europe/London')
    expect(res?.body).toContain('18:30 in (Europe/Berlin) Europe/Berlin at your timezone will be 05:30 PM \n')
  })

  it('lists every match for an ambiguous abbreviation', () => {
    const res = respond('/KST/now')
    expect(res?.body).toContain('Multiple timezones found for (KST)')
    expect(res?.body).toContain('Europe/Kaliningrad')
  })

  it('rejects unknown timezones and bad times', () => {
    expect(respond('/XYZQ/now')?.status).toBe(404)
    expect(respond('/Mars/Olympus/now')?.status).toBe(404)
    expect(respond('/PST/25pm')?.status).toBe(400)
  })

  it('needs a client timezone', () => {
    expect(respond('/PST/now', '')?.status).toBe(400)
  })
})
