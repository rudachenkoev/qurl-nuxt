export default defineAppConfig({
  ui: {
    primary: 'shark',
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
