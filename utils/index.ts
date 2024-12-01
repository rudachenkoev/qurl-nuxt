export const setDefaultQuery = (value: Record<string, any> = {}): Record<string, any> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    console.warn('Invalid value for query.')
    return {}
  }

  return { page: 1, page_size: 20, ...value }
}
