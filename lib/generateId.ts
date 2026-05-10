const prefixes = ['VOID', 'M', 'VX', 'NX', 'ECHO', 'DRIFT']

export function generateAnonId(): string {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const num = Math.floor(Math.random() * 900) + 100
  const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
  return `${prefix}-${num}${suffix}`
}