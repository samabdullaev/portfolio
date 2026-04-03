import {registerSeeder, key} from './helpers.js'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import type {SanityClient} from '@sanity/client'

const dataPath = resolve(__dirname, '../../src/data/projects.json')
let _data: any[] = []; try { _data = JSON.parse(readFileSync(dataPath, 'utf8')) } catch {}; const data = _data

registerSeeder({
  name: 'projects',
  async up(client: SanityClient) {
    for (const [i, p] of projects.entries()) {
      await client.createOrReplace({
        _id: `project-${p.slug}`,
        _type: 'project',
        title: p.title,
        slug: {_type: 'slug', current: p.slug},
        category: p.category,
        description: p.description,
        about: p.about,
        features: p.features,
        techStack: p.tech,
        gallery: (p.gallery || []).map((g: any) => ({
          _key: key(),
          _type: 'galleryItem',
          type: g.type,
          ...(g.type === 'image' ? {image: undefined} : {}), // images need upload - skip for now
          ...(g.type === 'video' ? {videoUrl: g.src} : {}),
        })),
        liveUrl: p.liveUrl || undefined,
        githubUrl: p.githubUrl || undefined,
        order: i + 1,
      })
      console.log(`     Created project: ${p.title}`)
    }
  },
  async down(client: SanityClient) {
    const ids = projects.map((p: any) => `project-${p.slug}`)
    const draftIds = ids.map((id: string) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})
