import * as path from 'path'
import FSProjectManager from '@/models/projects/FSProjectManager'
import Project from '@/models/projects/Project'

class Database {

  projectManager = new FSProjectManager()

  initPromise: Promise<any>

  projects: Project[]

  constructor() {

    this.initPromise = (async () => {

      this.projects = await this.projectManager.readAllProjects(path.resolve(process.env.CONTENT_DIR_PATH, 'projects'))
    })()
  }

  async getProjects() {

    await this.initPromise

    return this.projects
  }
}

let database = new Database()

export default database