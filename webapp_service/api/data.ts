//import * as Any from '../lib/models'
import fs from 'fs'
import path from 'path'
import connect from 'connect'
import express from 'express'
import { PreviewArticleData, Tag, FullArticleData, PortfolioItemPreview, FullPortfolioItem } from '~/lib/models.ts'

const CONTENT_DIR = process.env.CONTENT_DIR_PATH

// TAGS

var tags: { [key: string]: Tag } = {}

// load all tags
async function loadTags() {
  let info = JSON.parse((await fs.promises.readFile(path.resolve(CONTENT_DIR, 'tags.json'))).toString())
  for (let tagInfo of info) {
    tags[tagInfo.slug] = {
      name: tagInfo.name,
      slug: tagInfo.slug
    } as Tag
  }
}

// TODO: implement language for tags
function getTagById(id: string, languageCode: string) {
  return tags[id]
}

function getTagsById(ids: [string], languageCode: string) {
  return ids.map(id => tags[id])
}
// ARTICLES

var previewArticleData: { [slug: string]: PreviewArticleData } = {}
var sortedPreviewArticleData: PreviewArticleData[] = []

// load preview data for all articles
async function loadPreviewArticleData() {
  const articleDirectories = await fs.promises.opendir(path.resolve(CONTENT_DIR, 'articles'))

  for await (let articleDirectory of articleDirectories) {
    if (articleDirectory.isDirectory()) {
      let info = JSON.parse((await fs.promises.readFile(path.resolve(CONTENT_DIR, 'articles', articleDirectory.name, 'index.json'))).toString())
      if (info.publicationTimestamp <= 0) {
        continue
      }
      let previewText = (await fs.promises.readFile(path.resolve(CONTENT_DIR, 'articles', articleDirectory.name, 'preview.txt'))).toString()
      let currentArticlePreviewData: PreviewArticleData = {
        title: info.title,
        slug: articleDirectory.name,
        tags: getTagsById(info.tags, 'en'),
        previewText,
        previewImage: info.previewImage,
        publicationTimestamp: info.publicationTimestamp,
        modificationTimestamp: info.modificationTimestamp
      }
      previewArticleData[articleDirectory.name] = currentArticlePreviewData
    }
  }

  // TODO: handle sorting
  sortedPreviewArticleData = Object.values(previewArticleData).sort((a1, a2) => (new Date(a2.publicationTimestamp)).getTime() - (new Date(a1.publicationTimestamp)).getTime())
}

// load the full data for the article with specified slug
async function loadFullArticleData(slug: string): Promise<FullArticleData> {
  const previewData = previewArticleData[slug]
  const body = (await fs.promises.readFile(path.resolve(CONTENT_DIR, 'articles', slug, 'body.md'))).toString()
  const fullData: FullArticleData = {
    ...previewData,
    body: body
  }
  return fullData
}


// PORTFOLIO
var portfolioItemPreviews: { [key: string]: PortfolioItemPreview[] } = {}
async function loadPortfolioItemPreviews() {
  const dirs = await fs.promises.opendir(path.resolve(CONTENT_DIR, 'portfolio'))
  for await (var dir of dirs) {
    if (dir.isDirectory) {
      let id = dir.name
      let indexData: { [key: string]: any } = JSON.parse(await fs.promises.readFile(path.resolve(CONTENT_DIR, 'portfolio', dir.name, 'index.json'), 'utf-8'))
      for (let [languageCode, languageData] of Object.entries(indexData)) {
        let previewText = await fs.promises.readFile(path.resolve(CONTENT_DIR, 'portfolio', dir.name, 'preview-' + languageCode + '.txt'), 'utf-8')
        var previewData: PortfolioItemPreview = {
          id,
          slug: languageData.slug,
          title: languageData.title,
          tags: getTagsById(languageData.tags, languageCode),
          previewText: previewText 
        }
        if (!portfolioItemPreviews[languageCode]) {
          portfolioItemPreviews[languageCode] = []
        }
        portfolioItemPreviews[languageCode].push(previewData)
      }
    }
  }
}


// LOAD PREVIEW DATA

loadTags()
  .then(loadPreviewArticleData)
  .then(loadPortfolioItemPreviews)



var router = express()

router.use('/tags', async (req, res) => {
  res.json(tags)
})

router.use('/preview-article-data/all', async (req, res) => {
  res.json(sortedPreviewArticleData)
})

router.use('/preview-article-data/:slug', async (req, res) => {
  res.json(previewArticleData[req.params.slug])
})

router.use('/full-article-data/:slug', async (req, res) => {
  res.json(await loadFullArticleData(req.params.slug))
})

router.use('/portfolio-item-previews/:languageCode/all', async (req, res) => {
  res.json(portfolioItemPreviews[req.params.languageCode])
})

export default router /*async function (req, res, next) {
  console.log('REQIEST', req, req.query)
  
  /*
  const categoryDirectories = await fs.promises.opendir(CATEGORIES_DIR)

  const categories = []
  const topics = []
  const materials = []

  for await (let categoryDirectory of categoryDirectories) {
    if (!categoryDirectory.isDirectory()) continue
    const categoryDirName = categoryDirectory.name
    const categoryDirPath = CATEGORIES_DIR + '/' + categoryDirName
    const categoryInfo = JSON.parse(await fs.promises.readFile(categoryDirPath + '/index.json'))

    const category = new Category({ id: categoryDirName, name: categoryInfo.name, position: Number(categoryInfo.position) })
    categories.push(category)

    const topicDirectories = await fs.promises.opendir(categoryDirPath + '/topics')
    for await (let topicDirectory of topicDirectories) {
      if (!topicDirectory.isDirectory()) continue
      const topicDirName = topicDirectory.name
      const topicDirPath = categoryDirPath + '/topics/' + topicDirName
      const topicInfo = JSON.parse(await fs.promises.readFile(topicDirPath + '/index.json'))
      
      const topic = new Topic({ id: topicDirName, name: topicInfo.name, position: Number(topicInfo.position), categoryId: categoryDirName })
      topics.push(topic)

      const materialDirectories = await fs.promises.opendir(topicDirPath + '/materials')
      for await (let materialDirectory of materialDirectories) {
        if (!materialDirectory.isDirectory()) continue
        const materialDirName = materialDirectory.name
        const materialDirPath = topicDirPath + '/materials/' + materialDirName
        const info = JSON.parse(await fs.promises.readFile(materialDirPath + '/index.json'))
        let text = await fs.promises.readFile(materialDirPath + '/text.md', { encoding: 'utf-8' })

        const imageNames = await fs.promises.readdir(materialDirPath + '/images')
        // TODO: this rewriting can also be done in the store or so...?
        imageNames.forEach(imageName => {
          text += `\n\r[${imageName}]: /${categoryDirName}/topics/${topicDirName}/materials/${materialDirName}/images/${imageName}`
        })

        const material = new Material({ id: materialDirName, name: info.name, position: Number(info.position), text, topicId: topicDirName, categoryId: categoryDirName, downloads: info.downloads, previewImages: info.previewImages })
        materials.push(material)
        console.log(text)
      }
    }
    console.log(categoryInfo)
  }

  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify({
    categories,
    topics,
    materials
  }))*/
/*  res.end('END')
}*/