// utils/date.ts
export function timeSince(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' y'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' mo'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' d'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' h'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' min'
  
  return 'Just now'
}