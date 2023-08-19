import { createClient, groq } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'
import { Post } from '../../src/types/typing'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type=="post"]{
      _id,
        title,
        author -> {
          name,
          image
        },
        mainImage,
        "slug": slug.current
    }`
  )
}

export async function getPost(slug: string) {
  return client.fetch(
    groq`*[_type=="post" && slug.current == $slug][0]{
      _id,
        title,
        author -> {
          name,
          image
        },
        mainImage,
        "slug": slug.current
    }{slug}`
  )
}