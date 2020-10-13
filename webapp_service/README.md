# engineeringbydoing blog

> My stunning Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Environment Variables

Available environment variables in .env file in root directory of application:

CONTENT_DIR_PATH, root dir of content, should contain tags.json and articles

BASE_URL, without / at the end, used e.g. for /data api endpoint

MATOMO_URL

MATOMO_SITE_ID

CLEVERREACH_RECEIVER_GROUP_ID

CLEVERREACH_DOI_ID

Available environment variablers in .env.contact file in root directory of application:

CONTACT_NAME

CONTACT_EMAIL_ADDRESS

Available environment variables in .env.legal file in root directory of application:

LEGAL_NAME

LEGAL_ADDRESS_LINE_1

LEGAL_ADDRESS_LINE_2

LEGAL_TELEPHONE_NUMBER

LEGAL_EMAIL_ADDRESS