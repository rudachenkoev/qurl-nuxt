export default defineAppConfig({
  ui: {
    primary: 'shark',
    verticalNavigation: {
      base: 'gap-3',
      padding: 'px-3 py-2',
      rounded: 'rounded-lg',
      active: 'text-shark-950 dark:text-shark-50 before:bg-white dark:before:bg-shark-500 shadow',
      inactive:
        'text-shark-500 dark:text-shark-300 hover:text-shark-800 dark:hover:text-shark-200 hover:before:bg-shark-50 dark:hover:before:bg-shark-900',
      icon: {
        active: 'text-shark-950 dark:text-shark-50',
        inactive: 'text-shark-500 dark:text-shark-300 hover:text-shark-800 dark:hover:text-shark-200'
      }
    },
    divider: {
      border: {
        base: 'border-shark-200 dark:border-shark-600'
      }
    },
    button: {
      inline: 'justify-center',
      default: {
        size: 'md'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    },
    textarea: {
      default: {
        size: 'md'
      }
    },
    select: {
      default: {
        size: 'md'
      }
    }
  }
})
