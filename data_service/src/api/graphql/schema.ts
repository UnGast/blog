import { gql } from 'apollo-server-express'

import database from '@/database/Database'

export let typeDefs = gql`

  type Image {
    url: String!
  }

  type ProjectBit {
    timestamp: String!
    previewImages: [Image]!
    summary: String!
    text: String!
  }

  type Project {
    title: String!
    slug: String!
    url: String!
    description: String!
    previewImages: [Image]!
    startTimestamp: String!
    bits: [ProjectBit]!
  }

  type Query {
    projects: [Project]
    project(slug: String!): Project
  }
`

export let resolvers = {
  Query: {
    async projects() {
      return await database.getProjects()
    },
    async project(parent, args) {
      return (await database.getProjects()).find((project) => project.slug === args.slug)
    }
  },
  Project: {
    startTimestamp(parent) {
      return parent.bits[parent.bits.length - 1].timestamp
    }
  }
}