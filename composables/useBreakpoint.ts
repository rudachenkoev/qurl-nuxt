type BreakpointPrefix = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

type Breakpoint = {
  prefix: BreakpointPrefix
  minWidth: number
}

export function useBreakpoint() {
  const currentBreakpoint = ref<BreakpointPrefix | ''>('')

  const breakpoints: Breakpoint[] = [
    { prefix: '2xl', minWidth: 1536 },
    { prefix: 'xl', minWidth: 1280 },
    { prefix: 'lg', minWidth: 1024 },
    { prefix: 'md', minWidth: 768 },
    { prefix: 'sm', minWidth: 640 },
    { prefix: 'xs', minWidth: 0 } // Default for < 640px
  ]

  const getBreakpoint = (width: number): BreakpointPrefix | '' =>
    breakpoints.find(bp => width >= bp.minWidth)?.prefix || ''

  const updateBreakpoint = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      currentBreakpoint.value = getBreakpoint(width)
    }
  }

  const checkBreakpoint = (prefix: BreakpointPrefix | BreakpointPrefix[]): boolean => {
    if (Array.isArray(prefix)) {
      return currentBreakpoint.value ? prefix.includes(currentBreakpoint.value) : false
    }

    const targetBreakpoint = breakpoints.find(bp => bp.prefix === prefix)
    if (!targetBreakpoint) {
      console.warn(`Breakpoint "${prefix}" not found.`)
      return false
    }

    const currentMinWidth = breakpoints.find(bp => bp.prefix === currentBreakpoint.value)?.minWidth || 0

    return currentMinWidth >= targetBreakpoint.minWidth
  }

  // Determine the breakpoint immediately (client-side only)
  if (typeof window !== 'undefined') {
    currentBreakpoint.value = getBreakpoint(window.innerWidth)
  }

  onMounted(() => {
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  return {
    currentBreakpoint,
    checkBreakpoint
  }
}
