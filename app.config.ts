export default defineAppConfig({
  ui: {
    primary: 'web-orange',
    gray: 'gallery',
    table: {
      emptyState: {
        icon: 'text-gallery-300 dark:text-gallery-400',
        label: 'text-sm text-center text-gallery-300 dark:text-gallery-400'
      }
    },
    divider: {
      border: {
        base: 'border-gallery-200 dark:border-gallery-600'
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
        selected: 'bg-gallery-50'
      },
      default: {
        clearSearchOnClose: true
      }
    }
  }
})
