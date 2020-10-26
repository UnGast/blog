import { gql } from 'apollo-server-express'

import database from '@/database/Database'
import ProjectBit from '@/models/projects/ProjectBit'

export let typeDefs = gql`
  type Image {
    url: String!
  }

  type Tag {
    slug: String!
    name: String!
  }

  type ProjectBit {
    timestamp: String!
    previewImages: [Image]!
    summary: String!
    text: String!
    project: Project!
    next: ProjectBit
    previous: ProjectBit
  }

  type Project {
    title: String!
    slug: String!
    tags: [Tag]!
    shortDescription: String!
    fullDescription: String!
    previewImages: [Image]!
    startTimestamp: String!
    bits: [ProjectBit]!
  }

  type Query {
    projects: [Project]
    project(slug: String!): Project
    projectBit(projectSlug: String!, bitTimestamp: String!): ProjectBit
  }
`

export let resolvers = {
  Query: {
    async projects() {
      return await database.getProjects()
    },
    async project(parent, args) {
      return (await database.getProjects()).find((project) => project.slug === args.slug)
    },
    async projectBit(parent, args) {
      let projects = await database.getProjects()
      let targetBitTimestamp = Number(args.bitTimestamp)
      let bitResult: ProjectBit|null = null
      console.log('PROJECT BIT', args)
      for (let project of projects) {
        if (project.slug === args.projectSlug) {
          console.log("'FOUND PROJECT")
          for (let bit of project.bits) {
            console.log('COMPARE', bit.timestamp, targetBitTimestamp)
            if (bit.timestamp.getTime() === targetBitTimestamp) {
              console.log('GOT RESULT', bit)
              bitResult = bit
              break
            }
            if (bitResult) {
              break
            }
          }
        }
      }
      return bitResult
    }
  },
  Project: {
    startTimestamp(parent) {
      return parent.bits[parent.bits.length - 1].timestamp
    }
  },
  ProjectBit: {
    async project(parent) {
      return (await database.getProjects()).find((project) => project.id === parent.projectId)
    },
    async next(parent: ProjectBit) {
      let project = (await database.getProjects()).find(project => project.id === parent.projectId)
      let ownIndex = project.bits.findIndex(bit => bit.timestamp.getTime() === parent.timestamp.getTime())
      return project.bits[ownIndex - 1]
    },
    async previous(parent) {
      let project = (await database.getProjects()).find(project => project.id === parent.projectId)
      let ownIndex = project.bits.findIndex(bit => bit.timestamp.getTime() === parent.timestamp.getTime())
      return project.bits[ownIndex + 1]
    }
  }
}