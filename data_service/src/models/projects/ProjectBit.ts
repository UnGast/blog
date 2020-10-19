import Image from './Image'

export default interface ProjectBit {

  timestamp: Date

  summary: string

  previewImages: Image[]

  text: string

  projectId: string
}