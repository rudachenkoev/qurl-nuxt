export const useFormatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
): string => {
  const { locale, locales } = useI18n()
  const currentLocale = locales.value.find(item => item.code === locale.value)?.code || 'en-US'
  return date.toLocaleDateString(currentLocale, options)
}
