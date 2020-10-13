import { format } from 'date-fns'
import Vue from 'vue'

Vue.prototype.$formatDatetime = function(date: Date) {
  return format(date, this.$t('datetimeFormat'))
}