import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

import * as express from 'express'
import graphqlMiddleware from '@/api/graphql/serve'

let app = express()

app.use('/graphql', graphqlMiddleware)

if (process.env.NODE_ENV === 'development') {

    console.log('Serving content assets in development mode.')

    app.use('/project/:projectId/asset(/*)', (req, res, next) => {

        let assetFilePath = path.resolve(
            process.env.CONTENT_DIR_PATH,
            'projects',
            req.params.projectId,
            'assets',
            req.params['1'])

        if ('download' in req.query) {
            res.download(assetFilePath, typeof req.query.download ? req.query.download as string : '')
        } else {
            res.sendFile(assetFilePath)
        }
    })

    app.use('/project/:projectId/bit/:bitId/asset(/*)', (req, res, next) => {

        let assetFilePath = path.resolve(
            process.env.CONTENT_DIR_PATH,
            'projects',
            req.params.projectId,
            'bits',
            req.params.bitId,
            'assets',
            req.params['1'])

        if ('download' in req.query) {
            res.download(assetFilePath, typeof req.query.download ? req.query.download as string : '')
        } else {
            res.sendFile(assetFilePath)
        }
    })
}

let host = process.env.HOST || 'localhost'

let port = Number(process.env.PORT) || 8080

let server = app.listen(port, host)

console.log(`Listening on ${host}:${port}`)