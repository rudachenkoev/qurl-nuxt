export type ConfirmationDialogOptions = {
  title?: string
  description?: string
  confirmButton?: string
  cancelButton?: string
}

export const useConfirmationDialogStore = defineStore('confirmationDialog', () => {
  const { t } = useI18n()

  const isVisible = ref(false)
  const resolvePromise = ref<((value: boolean) => void) | null>(null)

  const defaultOptions = {
    title: t('payAttention'),
    description: '',
    confirmButton: t('btn.confirm'),
    cancelButton: t('btn.cancel')
  }

  const options = ref<ConfirmationDialogOptions>(defaultOptions)

  const confirmationHandler = (customOptions?: ConfirmationDialogOptions) =>
    new Promise(resolve => {
      if (customOptions) options.value = { ...defaultOptions, ...customOptions }
      isVisible.value = true
      resolvePromise.value = resolve
    })

  const confirm = () => {
    if (resolvePromise.value) resolvePromise.value(true)
    resetDialog()
  }

  const cancel = () => {
    if (resolvePromise.value) resolvePromise.value(false)
    resetDialog()
  }

  const resetDialog = () => {
    isVisible.value = false
    setTimeout(() => {
      options.value = { ...defaultOptions }
      resolvePromise.value = null
    }, 300)
  }

  return {
    isVisible,
    options,
    confirmationHandler,
    confirm,
    cancel
  }
})
