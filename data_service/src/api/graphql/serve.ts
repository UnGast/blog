import * as express from 'express'
import { ApolloServer, concatenateTypeDefs } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'

let router = express()

let graphqlServer = new ApolloServer({ typeDefs, resolvers })

graphqlServer.applyMiddleware({ app: router, path: '/' })

export default router