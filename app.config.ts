export default defineAppConfig({
  ui: {
    primary: 'shark',
    table: {
      emptyState: {
        icon: 'text-shark-300 dark:text-shark-400',
        label: 'text-sm text-center text-shark-300 dark:text-shark-400'
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
    formGroup: {
      error: 'text-xs'
    },
    modal: {
      container: 'items-center'
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
    },
    selectMenu: {
      option: {
        selected: 'bg-shark-50'
      },
      default: {
        clearSearchOnClose: true
      }
    }
  }
})
