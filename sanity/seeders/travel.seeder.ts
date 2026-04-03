import {registerSeeder, key} from './helpers.js'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import type {SanityClient} from '@sanity/client'

const dataPath = resolve(__dirname, '../../src/data/travel.json')
let _data: any[] = []; try { _data = JSON.parse(readFileSync(dataPath, 'utf8')) } catch {}; const data = _data

registerSeeder({
  name: 'travel',
  async up(client: SanityClient) {
    for (const [i, d] of destinations.entries()) {
      await client.createOrReplace({
        _id: `travel-${d.slug}`,
        _type: 'travelDestination',
        title: d.title,
        slug: {_type: 'slug', current: d.slug},
        flag: d.flag || undefined,
        overview: d.overview ? {
          citiesVisited: d.overview.citiesVisited || [],
          accommodation: d.overview.accommodation || [],
        } : undefined,
        placesToTravel: d.placesToTravel ? d.placesToTravel.map((p: any) => ({
          _key: key(),
          city: p.city,
          places: p.places,
        })) : undefined,
        personalTips: d.personalTips || undefined,
        sections: d.sections ? d.sections.map((s: any) => ({
          _key: key(),
          title: s.title,
          items: s.items,
        })) : undefined,
        order: i + 1,
      })
      console.log(`     Created travel: ${d.title}`)
    }
  },
  async down(client: SanityClient) {
    const ids = destinations.map((d: any) => `travel-${d.slug}`)
    const draftIds = ids.map((id: string) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})
