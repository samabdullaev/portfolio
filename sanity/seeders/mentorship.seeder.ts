import {registerSeeder} from './helpers.js'
import type {SanityClient} from '@sanity/client'

registerSeeder({
  name: 'mentorship',
  async up(client: SanityClient) {
    await client.createOrReplace({
      _id: 'mentorship-1',
      _type: 'mentorshipArticle',
      title: "Universitetingizni qanchalik yaxshi bilasiz?",
      task: "Task 1",
      date: "Mar 18, 2026",
      externalUrl: "https://publink.uz/education/universitetingizni-qanchalik-yaxshi-bilasiz",
      order: 1,
    })
    console.log('     Created mentorship article')
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "mentorshipArticle"]'})
  },
})
