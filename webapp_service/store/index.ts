import { FullArticleData, PreviewArticleData, Tag, PortfolioItemPreview } from '~/lib/models'
import axios from 'axios'
import Vuex from 'vuex'

declare var _paq: any // global matomo reference

export default () => new Vuex.Store({
  state: {
    baseUrl: null as string,
    tags: Array<Tag>(),
    sortedArticlePreviews: Array<PreviewArticleData>(),
    fullArticles: {} as { [slug: string]: FullArticleData },
    portfolioItemPreviews: Array<PortfolioItemPreview>(),
    userHidNewsletter: false,
    allowCookies: false, // TODO: check the law situation, what's the situation tracking or cookies --> where does the user have to give consent
    cookieDecisionMade: null as boolean
  },
  getters: {
    getArticleImageBaseUrl: (state) => (article) => {
      return process.env.BASE_URL + `/articles/${article.slug}/images`
    },
    getArticleImageUrl: (state, getters) => (article, imageFilename) => {
      return `${getters.getArticleImageBaseUrl(article)}/${imageFilename}`
    },
    getLocalizedArticlePublicationDate: (state) => (article, locale) => {
      let date = new Date(article.publicationTimestamp)
      let options = { day: 'numeric', month: 'numeric', year: 'numeric' }
      return date.toLocaleDateString(locale, options)
    }
  },
  mutations: {
    setTags: (state, tags: Tag[]) => {
      state.tags = tags
    },
    setSortedArticlePreviews: (state, sortedArticlePreviews: PreviewArticleData[]) => {
      state.sortedArticlePreviews = sortedArticlePreviews
    },
    setPortfolioItemPreviews: (state, portfolioItemPreviews) => {
      state.portfolioItemPreviews = portfolioItemPreviews
    },
    storeFullArticle: (state, fullArticle: FullArticleData) => {
      state.fullArticles[fullArticle.slug] = fullArticle
    },
    setUserHidNewsletter (state, flag) {
      state.userHidNewsletter = flag
    },
    setBaseUrl(state, baseUrl) {
      state.baseUrl = baseUrl
    },
    setAllowCookies(state, flag) {
      state.allowCookies = flag
    },
    setCookieDecisionMade(state, flag) {
      state.cookieDecisionMade = flag
    },
  },
  actions: {
    nuxtClientInit({ commit }, context) {
      var storedFlag = localStorage.getItem('userHidNewsletter')
      if (storedFlag !== null) {
        commit('setUserHidNewsletter', JSON.parse(storedFlag))
      }
      var storedFlag = localStorage.getItem('allowCookies')
      if (storedFlag !== null) {
        commit('setAllowCookies', JSON.parse(storedFlag))
      }
      var storedFlag = localStorage.getItem('cookieDecisionMade')
      if (storedFlag !== null) {
        commit('setCookieDecisionMade', JSON.parse(storedFlag))
      }
    },
    async nuxtServerInit ({ commit }, context) {
      let baseUrl
      if (context.ssrContext.electronBaseUrl) {
        baseUrl = context.ssrContext.electronBaseUrl
      } else {
        baseUrl = process.env.BASE_URL
      }
      commit('setBaseUrl', baseUrl)

      await axios.get(baseUrl + '/api/data/tags').then(result => {
        commit('setTags', result.data)
      })
      await axios.get(baseUrl + '/api/data/preview-article-data/all').then(result => {
        commit('setSortedArticlePreviews', result.data)
      })
      await axios.get(baseUrl + `/api/data/portfolio-item-previews/${context.app.i18n.locale}/all`).then(result => {
        commit('setPortfolioItemPreviews', result.data)
      })

      //let userIp = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress
      // TODO: might want to check which country user is from
    },
    async loadFullArticle({ commit, state }, slug) {
      if (state.fullArticles[slug] && process.env.NODE_ENV !== 'development') {
        return state.fullArticles[slug]
      } else {
        await axios.get(state.baseUrl + '/api/data/full-article-data/' + slug).then(result => {
          commit('storeFullArticle', result.data)
        })
        return state.fullArticles[slug]
      }
    },
    setUserHidNewsletter({ commit }, flag) {
      commit('setUserHidNewsletter', flag)
      localStorage.setItem('userHidNewsletter', JSON.stringify(flag))
    },
    setAllowCookies({ commit }, flag) {
      commit('setAllowCookies', flag)
      localStorage.setItem('allowCookies', JSON.stringify(flag))
      if (flag) {
        _paq.push(['rememberConsentGiven']) // enable matomo cookie
      } else {
        try {
          _paq.push(['forgetConsentGiven']) // disable matomo cookie
        } catch (error) {
          console.debug(error)
        }
      }
    },
    setCookieDecisionMade({ commit }, flag) {
      commit('setCookieDecisionMade', flag)
      localStorage.setItem('cookieDecisionMade', JSON.stringify(flag))
    }
  }
})

/*
export const state = () => ({
  tags: [],
  topics: [],
  materials: [],
  userHidNewsletter: false
})

export const getters = {

  materialsByCategoryTopicId (state, getters) {
    const byId = {}

    getters.sortedMaterials.forEach(material => {
      if (!byId[material.categoryId]) {
        byId[material.categoryId] = []
      }
      if (!byId[material.categoryId][material.topicId]) {
        byId[material.categoryId][material.topicId] = []
      }
      byId[material.categoryId][material.topicId].push(material)
    })

    return byId
  },
  materialsById (state) {
    return state.materials.reduce((acc, material) => {
      acc[material.id] = material
      return acc
    }, {})
  },
  sortedMaterials (state) {
    return state.materials.slice().sort((m1, m2) => m1.position - m2.position)
  },
  sortedCategories (state) {
    return state.categories.slice().sort((c1, c2) => c1.position - c2.position)
  },
  categoriesById (state) {
    return state.categories.reduce((acc, category) => {
      acc[category.id] = category
      return acc
    })
  },  
  sortedTopics (state) {
    return state.topics.slice().sort((t1, t2) => t1.position - t2.position)
  },
  topicsById (state) {
    return state.topics.reduce((acc, topic) => {
      acc[topic.id] = topic
      return acc
    }, {})
  },
  sortedTopicsByCategoryId (state, getters) {
    return getters.sortedTopics.reduce((acc, topic) => {
      if (!acc[topic.categoryId]) {
        acc[topic.categoryId] = []
      }
      acc[topic.categoryId].push(topic)
      return acc
    }, {})
  },
  getDownloadUrl: (state, getters) => (material, download) => {
    return `/${material.categoryId}/topics/${material.topicId}/materials/${material.id}/downloads/${download.file}`
  },
  getImageUrl: (state, getters) => (material, basename) => {
    return `/${material.categoryId}/topics/${material.topicId}/materials/${material.id}/images/${basename}`
  }
}

export const mutations = {
  setMaterials (state, materials) {
    state.materials = materials
  },
  addMaterial (state, material) {
    state.materials.push(material)
  },
  setCategories (state, categories) {
    state.categories = categories
  },
  addCategory (state, category) {
    state.categories.push(category)
  },
  setTopics (state, topics) {
    state.topics = topics
  },
  addTopic (state, topic) {
    state.topics.push(topic)
  },
  setUserHidNewsletter (state, flag) {
    state.userHidNewsletter = flag
  }
}

export const actions = {
  nuxtClientInit({ commit }, context) {
    const storedFlag = localStorage.getItem('userHidNewsletter')
    if (storedFlag !== null) {
      commit('setUserHidNewsletter', JSON.parse(storedFlag))
    }
  },
  async nuxtServerInit ({ commit }, context) {
    let baseUrl
    if (context.ssrContext.electronBaseUrl) {
      baseUrl = context.ssrContext.electronBaseUrl
    } else {
      baseUrl = process.env.BASE_URL
    }
    await axios.get(baseUrl + '/api/data').then(result => {
      //commit('setCategories', result.data.categories)
      //commit('setTopics', result.data.topics)
      //commit('setMaterials', result.data.materials)
    })
  },
  setUserHidNewsletter ({ commit }, flag) {
    commit('setUserHidNewsletter', flag)
    localStorage.setItem('userHidNewsletter', JSON.stringify(flag))
  }
}*/