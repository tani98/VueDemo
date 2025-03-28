import { createI18n } from 'vue-i18n'
import es from './locales/es.json'

function loadLocaleMessages() {
  const sources = [{ es: es }]
  const messages = {}
  sources.forEach((lang) => {
    const key = Object.keys(lang)
    messages[key] = lang[key]
  })
  return messages
}

export default createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || 'es',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'es',
  messages: loadLocaleMessages(),
})
