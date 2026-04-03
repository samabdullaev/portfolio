import {registerSeeder, key} from './helpers.js'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import type {SanityClient} from '@sanity/client'

const dataPath = resolve(__dirname, '../../src/data/resources.json')
let _data: any[] = []; try { _data = JSON.parse(readFileSync(dataPath, 'utf8')) } catch {}; const data = _data

registerSeeder({
  name: 'resources',
  async up(client: SanityClient) {
    for (const [i, r] of resources.entries()) {
      await client.createOrReplace({
        _id: `resource-${r.slug}`,
        _type: 'resourceCategory',
        title: r.title,
        slug: {_type: 'slug', current: r.slug},
        sectionLabel: r.sectionLabel,
        gradientFrom: r.gradient[0],
        gradientTo: r.gradient[1],
        items: (r.items || []).map((item: any) => ({
          _key: key(),
          name: item.name,
          desc: item.desc || undefined,
          url: item.url,
        })),
        sections: r.sections ? r.sections.map((s: any) => ({
          _key: key(),
          label: s.label,
          items: (s.items || []).map((item: any) => ({
            _key: key(),
            name: item.name,
            desc: item.desc || undefined,
            url: item.url,
          })),
        })) : undefined,
        order: i + 1,
      })
      console.log(`     Created resource: ${r.title}`)
    }
  },
  async down(client: SanityClient) {
    const ids = resources.map((r: any) => `resource-${r.slug}`)
    const draftIds = ids.map((id: string) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})
