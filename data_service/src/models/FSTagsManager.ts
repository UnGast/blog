import Tag from "./Tag"
import * as path from 'path'
import * as fs from 'fs'

export default class FSTagsManager {
  constructor(private tagsFilePath: string) {}

  public async readAllTags(): Promise<Tag[]> {
    try {
      let rawFileContent = await fs.promises.readFile(this.tagsFilePath, 'utf-8')
      let parsed = JSON.parse(rawFileContent)
      return parsed as Tag[]
    } catch (e) {
      console.log('An exception occurred while reading the tags file', e)
      return []
    }
  }
}