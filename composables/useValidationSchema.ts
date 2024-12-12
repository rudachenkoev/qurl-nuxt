import Joi from 'joi'

export function useValidationSchema(rules: Record<string, Joi.Schema>) {
  const { t } = useI18n()

  const schema = Joi.object(rules)

  return schema.messages({
    'string.empty': t('validation.required'),
    'any.required': t('validation.required'),
    'string.uri': t('validation.uri')
  })
}
