import { parse } from 'date-fns'

export function parseDatetime(datetime: string): Date {

  return parse(datetime, 'dd.MM.yyyy mm:HH', new Date())
}