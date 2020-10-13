import ProjectBit from "./ProjectBit"
import Image from './Image'

export default interface Project {

  title: string
  
  slug: string

  url: string

  description: string

  bits: ProjectBit[]

  previewImages: Image[]
}