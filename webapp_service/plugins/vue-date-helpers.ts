import { format } from 'date-fns'
import { de, enUS } from 'date-fns/locale'
import Vue from 'vue'

let locales = { de, en: enUS }

Vue.prototype.$formatDatetime = function(date: Date) {
  return format(date, this.$t('datetimeFormat'))
}

Vue.prototype.$formatDate = function(date: Date|string|number) {
  if (typeof date === 'string') {
    date = new Date(Number(date))
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  return format(date, 'PP', { locale: locales[this.$i18n.locale] })
}