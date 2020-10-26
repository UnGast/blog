import ProjectBit from "./ProjectBit"
import Image from './Image'
import Tag from "../Tag"

export default interface Project {
  id: string
  title: string
  slug: string
  tags: Tag[]
  shortDescription: string
  fullDescription: string
  bits: ProjectBit[]
  previewImages: Image[]
  sortIndex: number
}