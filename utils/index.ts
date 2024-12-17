export const setDefaultQuery = (value: Record<string, any> = {}): Record<string, any> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    console.warn('Invalid value for query.')
    return {}
  }

  return { page: 1, pageCount: 10, ...value }
}

export function updateStateFields<T>(state: Partial<T>, newState: T) {
  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = newState[key] !== undefined ? newState[key] : ('' as T[Extract<keyof T, string>])
    }
  }
}

export const getFaviconUrl = (url: string) => {
  try {
    const { host } = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${host}&sz=32`
  } catch (err) {
    console.error('Invalid URL provided:', url, err)
    return undefined
  }
}

export function getDateOffset(days = 0) {
  const futureDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  return futureDate.toISOString().split('T')[0]
}
