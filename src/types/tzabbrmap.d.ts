declare module 'tzabbrmap' {
  const map: Record<string, Array<{ value: string, text: string, utc: string[] }>>
  export default map
}
