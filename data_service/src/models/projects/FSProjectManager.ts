import Project from "./Project"
import Image from './Image'
import * as fs from 'fs'
import * as path from 'path'
import { isValid as isValidDate } from 'date-fns'
import ProjectBit from "./ProjectBit"
import { parseDatetime } from "@/helpers/date"
import * as constants from '@/constants'

export default class FSProjectManager {
  async readAllProjects(projectsDir: string): Promise<Project[]> {
    let projectDirs = await fs.promises.readdir(projectsDir)

    let projects = (await Promise.all(projectDirs.map((projectDir) => {
      if (fs.existsSync(path.resolve(projectsDir, projectDir, 'index.json'))) {
        console.log('READ PROJECT AT', projectDir)
        return this.readProject(path.resolve(projectsDir, projectDir))
      }
    }))).filter(project => project).sort((a, b) => a.sortIndex - b.sortIndex)

    return projects
  }

  async readProject(projectDir: string): Promise<Project | null> {
    try {
      let rawIndexData = await fs.promises.readFile(path.resolve(projectDir, 'index.json'), 'utf8')

      let id = path.basename(projectDir)

      let parsedIndexData = JSON.parse(rawIndexData)

      let shortDescription = await fs.promises.readFile(path.resolve(projectDir, 'short_description.md'), 'utf-8')
      shortDescription = await this.preprocessProjectMarkdown(shortDescription, id)

      let fullDescription = await fs.promises.readFile(path.resolve(projectDir, 'full_description.md'), 'utf-8')
      fullDescription = await this.preprocessProjectMarkdown(fullDescription, id)

      let previewImages: Image[] = (parsedIndexData.previewImages || []).map(filename => ({
        url: this.makeProjectAssetUrl(filename, id)
      }))

      let bits = await this.readBits(path.resolve(projectDir, 'bits'), id)

      return {
        id, 
        title: parsedIndexData.title,
        slug: parsedIndexData.slug,
        url: parsedIndexData.url,
        shortDescription,
        fullDescription,
        previewImages,
        bits,
        sortIndex: parsedIndexData.sortIndex
      }

    } catch(err) {
      console.warn('error while reading Project in directory', projectDir, err)
      return null
    }
  }

  makeProjectAssetUrl(assetName: string, projectId: string): string {
    return constants.PROJECT_ASSET_URL_SCHEME
      .replace('$project', projectId)
      .replace('$asset', assetName)
  }

  async preprocessProjectMarkdown(markdown: string, projectId: string) {
    let preprocessed = markdown
    preprocessed = preprocessed.replace(/\$asset((\/[a-zA-Z0-9-_.]+)+)/g, (match, group1) => {
      return this.makeProjectAssetUrl(group1.substring(1), projectId)
    })
    return preprocessed
  }

  async readBits(bitsDir: string, projectId: string): Promise<ProjectBit[]> {
    let bitDirs = await fs.promises.readdir(bitsDir)
    return (await Promise.all(bitDirs.map(async bitDir => {
      if (fs.existsSync(path.resolve(bitsDir, bitDir, 'index.json'))) {
        return await this.readBit(path.resolve(bitsDir, bitDir), projectId)
      }
    }))).filter(bit => bit).sort((bit1, bit2) => bit2.timestamp.getTime() - bit1.timestamp.getTime())
  }

  async readBit(bitDir: string, projectId: string): Promise<ProjectBit | null> {
    try {    
      let rawIndexData = await fs.promises.readFile(path.resolve(bitDir, 'index.json'), 'utf-8')

      let indexData = JSON.parse(rawIndexData)

      let id = path.basename(bitDir)

      let timestamp = parseDatetime(indexData.timestamp)

      let previewImages: Image[] = indexData.previewImages.map(filename => {
        return { 
          url: this.makeBitAssetUrl(filename, id, projectId)
        }
      })

      let summary = await fs.promises.readFile(path.resolve(bitDir, 'summary.md'), 'utf-8')

      let text = await fs.promises.readFile(path.resolve(bitDir, 'text.md'), 'utf-8')
      text = await this.preprocessBitMarkdown(text, id, projectId)

      if (!isValidDate(timestamp)) {
        throw `invalid datetime given as ProjectBit timestamp: ${indexData.timestamp}`
      }

      return {
        previewImages,
        summary,
        text,
        timestamp,
        projectId
      }
    } catch(err) {
      console.warn('error while reading ProjectBit in directory', bitDir, err)
      return null
    }
  }

  makeBitAssetUrl(assetName: string, bitId: string, projectId: string) {
    return constants.PROJECT_BIT_ASSET_URL_SCHEME
      .replace('$project', projectId)
      .replace('$bit', bitId)
      .replace('$asset', assetName)
  }

  async preprocessBitMarkdown(markdown: string, bitId: string, projectId: string) {
    let preprocessed = markdown
    preprocessed = preprocessed.replace(/\$asset((\/[a-zA-Z0-9-_.]+)+)/g, (match, group1) => {
      return this.makeBitAssetUrl(group1.substring(1), bitId, projectId)
    })
    return preprocessed
  }
}