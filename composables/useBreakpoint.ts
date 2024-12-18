type Breakpoint = {
  prefix: string
  minWidth: number
}

export function useBreakpoint() {
  const currentBreakpoint = ref<string>('')

  const breakpoints: Breakpoint[] = [
    { prefix: '2xl', minWidth: 1536 },
    { prefix: 'xl', minWidth: 1280 },
    { prefix: 'lg', minWidth: 1024 },
    { prefix: 'md', minWidth: 768 },
    { prefix: 'sm', minWidth: 640 },
    { prefix: 'xs', minWidth: 0 } // Default for < 640px
  ]

  const getBreakpoint = (width: number): string => breakpoints.find(bp => width >= bp.minWidth)?.prefix || ''

  const updateBreakpoint = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      currentBreakpoint.value = getBreakpoint(width)
    }
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
    currentBreakpoint
  }
}
