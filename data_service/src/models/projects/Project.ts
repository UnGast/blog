import ProjectBit from "./ProjectBit"
import Image from './Image'

export default interface Project {
  id: string
  title: string
  slug: string
  /** @deprecated since always */
  url: string
  shortDescription: string
  fullDescription: string
  bits: ProjectBit[]
  previewImages: Image[]
  sortIndex: number
}