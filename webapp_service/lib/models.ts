export interface Tag {
  slug: string
  name: string
}

export interface PreviewArticleData {
  slug: string
  title: string
  previewText: string
  previewImage: string
  tags: Tag[] 
  publicationTimestamp: number
  modificationTimestamp: number
}

export interface FullArticleData extends PreviewArticleData {
  body: string
}

export interface PortfolioItemPreview {
  id: string
  slug: string
  title: string
  previewText: string
  tags: Tag[]
}

export interface FullPortfolioItem extends PortfolioItemPreview {

}