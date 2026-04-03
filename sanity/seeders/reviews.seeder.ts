import {registerSeeder, key} from './helpers.js'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import type {SanityClient} from '@sanity/client'

const dataPath = resolve(__dirname, '../../src/data/reviews.json')
let _data: any[] = []; try { _data = JSON.parse(readFileSync(dataPath, 'utf8')) } catch {}; const data = _data

registerSeeder({
  name: 'reviews',
  async up(client: SanityClient) {
    for (const r of reviews) {
      await client.createOrReplace({
        _id: `review-${r.slug}`,
        _type: 'yearlyReview',
        year: r.year,
        slug: {_type: 'slug', current: r.slug},
        gradientFrom: r.gradient[0],
        gradientTo: r.gradient[1],
        sections: r.sections.map((s: any) => ({
          _key: key(),
          title: s.title,
          items: s.items,
        })),
      })
      console.log(`     Created review: ${r.year}`)
    }
  },
  async down(client: SanityClient) {
    const ids = reviews.map((r: any) => `review-${r.slug}`)
    const draftIds = ids.map((id: string) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})
