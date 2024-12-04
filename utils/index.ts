export const setDefaultQuery = (value: Record<string, any> = {}): Record<string, any> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    console.warn('Invalid value for query.')
    return {}
  }

  return { page: 1, page_size: 20, ...value }
}

export function updateStateFields<T>(state: Partial<T>, newState: T) {
  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = newState[key] !== undefined ? newState[key] : ('' as T[Extract<keyof T, string>])
    }
  }
}
