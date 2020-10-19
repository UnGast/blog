import { query } from "express"

type FieldList = Array<string|{name:string, fields: FieldList}>
export function generateQueryFieldsString(fields: FieldList) {
  let queryString = ''
  for (let field of fields) {
    if (typeof field === 'string') {
      queryString += field + ','
    } else {
      queryString += `${field.name} { ${generateQueryFieldsString(field.fields)} }`
    }
  }
  return queryString
}