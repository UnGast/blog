interface PageHeadConfig {
  title: string
  description: string
  url: string
  ogType?: string // default: website
  twitterCard?: string // default: summary
  imageUrl?: string
}

export function generatePageHead(headConfig: PageHeadConfig) {
  const head = {
    title: headConfig.title,
    meta: [
      { hid: 'title', name: 'title', content: headConfig.title },
      { hid: 'description', name: 'description', content: headConfig.description },
      
      { hid: 'og:title', property: 'og:title', content: headConfig.title },
      { hid: 'og:description', property: 'og:description', content: headConfig.description },
      { hid: 'og:type', property: 'og:type', content: headConfig.ogType || 'website' },
      { hid: 'og:url', property: 'og:url', content: headConfig.url },

      { hid: 'twitter:title', property: 'twitter:title', content: headConfig.title },
      { hid: 'twitter:description', property: 'twitter:description', content: headConfig.description },
      { hid: 'twitter:card', property: 'twitter:card', content: headConfig.twitterCard || 'summary' },
      { hid: 'twitter:url', property: 'twitter:url', content: headConfig.url },
    ]
  }

  // TODO: might need to add more properties for images https://ogp.me/
  if (headConfig.imageUrl) {
    head.meta.push(
      { hid: 'og:image', property: 'og:image', content: headConfig.imageUrl },
      { hid: 'twitter:image', property: 'twitter:image', content: headConfig.imageUrl },
    )
  }

  return head
}