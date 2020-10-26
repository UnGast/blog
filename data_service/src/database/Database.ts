import * as path from 'path'
import FSProjectManager from '@/models/projects/FSProjectManager'
import Project from '@/models/projects/Project'
import FSTagsManager from '@/models/FSTagsManager'

class Database {
  tagsManager = new FSTagsManager(path.resolve(process.env.CONTENT_DIR_PATH, 'tags.json'))
  projectManager = new FSProjectManager(this.tagsManager)
  initPromise: Promise<any>
  projects: Project[]

  constructor() {
    this.initPromise = (async () => {
      this.projects = await this.projectManager.readAllProjects(path.resolve(process.env.CONTENT_DIR_PATH, 'projects'))
    })()
  }

  async getProjects() {
    if (process.env.NODE_ENV === 'development') {
      return await this.projectManager.readAllProjects(path.resolve(process.env.CONTENT_DIR_PATH, 'projects'))
    } else {
      await this.initPromise
      return this.projects
    }
  }
}

let database = new Database()

export default database