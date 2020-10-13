import serveStatic from 'serve-static'
import path from 'path'
import dotenv  from 'dotenv'
import fs from 'fs'
dotenv.config()

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'EngineeringByDoing Blog' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'EngineeringByDoing Blog' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#5050ff' },
      { hid: 'theme-color', name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5050ff' },
      //{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Roboto+Condensed:wght@400;700&display=swap' },
      //{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.css', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2', crossorigin: true },
      { rel: 'preload', as: 'font', href: 'https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2', crossorigin: true },
      { rel: 'preload', as: 'font', href: 'https://fonts.gstatic.com/s/robotocondensed/v18/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQk6YvM.woff2', crossorigin: true },
      { rel: 'preload', as: 'font', href: 'https://fonts.gstatic.com/s/robotocondensed/v18/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCQYb9lecyU.woff2', crossorigin: true },
      { rel: 'preconnect', href: process.env.MATOMO_URL, crossorigin: true },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: true },
    ],
    style: [
    ],
  },
  publicRuntimeConfig: Object.assign({},
    dotenv.config({ path: path.resolve(__dirname, '.env.legal') }).parsed,
    dotenv.config({ path: path.resolve(__dirname, '.env.contact') }).parsed),
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#6464f0' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/global/global.scss',
    '~/node_modules/katex/dist/katex.min.css'
  ],
  serverMiddleware: [
    { path: '/api/data', handler: '~/api/data.ts' },
    { path: '/api/newsletter', handler: '~/api/newsletter.ts' },
    //{ path: '/api/graphql', handler: '~/api/graphql/serve.ts' }
  ].concat(process.env.NODE_ENV === 'development' ? [ serveStatic(process.env.CONTENT_DIR_PATH) ] as any : []),
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-matomo.js', ssr: false },
    { src: '~/plugins/vue-date-helpers.ts', ssr: true }
  ],
  babel: {
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: process.env.NODE_ENV === 'development'
      }
    ]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    'nuxt-client-init-module',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en.js'
          },
          {
            code: 'de',
            file: 'de.js'
          }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'lang/',
        vueI18n: {
          fallbackLocale: 'en'
        }
      }
    ],
    'vue-social-sharing/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = { fs: 'empty' }
      config.resolve.alias.style = path.resolve(__dirname, 'assets/style/style.scss')
      //if (ctx.isClient) { config.target = 'electron-renderer' }
    }
  },
  generate: {
    routes() {
      return [
        '/article/using-c-code-in-swift'
      ]
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:8080/graphql'
      }
    }
  }
}
