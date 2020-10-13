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
    
    console.log('READ PROJECTS', projectsDir)

    let projectDirs = await fs.promises.readdir(projectsDir)

    console.log('DIORS', projectDirs)

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

      let description = await fs.promises.readFile(path.resolve(projectDir, 'description.md'), 'utf-8')

      let previewImages: Image[] = (parsedIndexData.previewImages || []).map(filename => ({

        url: constants.PROJECT_ASSET_URL_SCHEME
          .replace('$project', id)
          .replace('$asset', filename)
      }))

      let bits = await this.readBits(path.resolve(projectDir, 'bits'), id)

      return {
        id: parsedIndexData.id, 
        title: parsedIndexData.title,
        slug: parsedIndexData.slug,
        url: parsedIndexData.url,
        description: description,
        previewImages: previewImages,
        bits,
        sortIndex: parsedIndexData.sortIndex
      }

    } catch(err) {

      console.warn('error while reading Project in directory', projectDir, err)

      return null
    }
  }

  async readBits(bitsDir: string, projectId: string): Promise<ProjectBit[]> {
    
    let bitDirs = await fs.promises.readdir(bitsDir)

    return (await Promise.all(bitDirs.map(async bitDir => {

      if (fs.existsSync(path.resolve(bitsDir, bitDir, 'index.json'))) {

        return await this.readBit(path.resolve(bitsDir, bitDir), projectId)
      }

    }))).filter(bit => bit)
  }

  async readBit(bitDir: string, projectId: string): Promise<ProjectBit | null> {

    try {    
      
      let rawIndexData = await fs.promises.readFile(path.resolve(bitDir, 'index.json'), 'utf-8')

      let indexData = JSON.parse(rawIndexData)

      let id = path.basename(bitDir)

      let timestamp = parseDatetime(indexData.timestamp)

      let previewImages: Image[] = indexData.previewImages.map(filename => {
        return { 
          url: constants.PROJECT_BIT_ASSET_URL_SCHEME
            .replace('$project', projectId)
            .replace('$bit', id)
            .replace('$asset', filename)
        }
      })

      let summary = await fs.promises.readFile(path.resolve(bitDir, 'summary.md'), 'utf-8')

      let text = await fs.promises.readFile(path.resolve(bitDir, 'text.md'), 'utf-8')

      if (!isValidDate(timestamp)) {
        
        throw `invalid datetime given as ProjectBit timestamp: ${indexData.timestamp}`
      }

      return {

        previewImages,

        summary,

        text,

        timestamp
      }

    } catch(err) {

      console.warn('error while reading ProjectBit in directory', bitDir, err)

      return null
    }
  }
}