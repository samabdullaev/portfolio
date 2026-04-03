import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

const entries = [
  {
    "title": "March 2026: Networking",
    "url": "https://www.linkedin.com/pulse/march-2026-networking-sam-abdullaev-6djfe",
    "month": 3,
    "year": 2026
  },
  {
    "title": "February 2026: Interviews",
    "url": "https://www.linkedin.com/pulse/february-2026-interviews-sam-abdullaev-lqr5e",
    "month": 2,
    "year": 2026
  },
  {
    "title": "January 2026: Resilience",
    "url": "https://www.linkedin.com/pulse/january-2026-resilience-sam-abdullaev-8dsae",
    "month": 1,
    "year": 2026
  },
  {
    "title": "December 2025: Journey",
    "url": "https://www.linkedin.com/pulse/december-2025-journey-sam-abdullaev-eg1je",
    "month": 12,
    "year": 2025
  },
  {
    "title": "November 2025: Creation",
    "url": "https://www.linkedin.com/pulse/november-2025-creation-sam-abdullaev-umjie",
    "month": 11,
    "year": 2025
  },
  {
    "title": "October 2025: Effort",
    "url": "https://www.linkedin.com/pulse/october-2025-effort-sam-abdullaev-8wtne",
    "month": 10,
    "year": 2025
  },
  {
    "title": "September 2025: Recharge",
    "url": "https://www.linkedin.com/pulse/september-2025-recharge-sam-abdullaev-xzh1e",
    "month": 9,
    "year": 2025
  },
  {
    "title": "August 2025: Pursuit",
    "url": "https://www.linkedin.com/pulse/august-2025-pursuit-sam-abdullaev-2lrfe",
    "month": 8,
    "year": 2025
  },
  {
    "title": "July 2025: Execution",
    "url": "https://www.linkedin.com/posts/samabdullaev_month-22-heres-my-progress-in-july-toward-activity-7357077680900427777-obbo",
    "month": 7,
    "year": 2025
  },
  {
    "title": "June 2025: Momentum",
    "url": "https://www.linkedin.com/pulse/june-2025momentum-sam-abdullaev-kekme",
    "month": 6,
    "year": 2025
  },
  {
    "title": "May 2025: Hustle",
    "url": "https://www.linkedin.com/pulse/may-2025-hustle-sam-abdullaev-qdoze",
    "month": 5,
    "year": 2025
  },
  {
    "title": "April 2025: Completion",
    "url": "https://www.linkedin.com/pulse/april-2025completion-sam-abdullaev-jymge",
    "month": 4,
    "year": 2025
  },
  {
    "title": "March 2025: Quest",
    "url": "https://www.linkedin.com/pulse/march-2025quest-sam-abdullaev-okive",
    "month": 3,
    "year": 2025
  },
  {
    "title": "February 2025: Application",
    "url": "https://www.linkedin.com/pulse/february-2025-application-sam-abdullaev-jzftf",
    "month": 2,
    "year": 2025
  },
  {
    "title": "January 2025: Refinement",
    "url": "https://www.linkedin.com/pulse/january-2025-refinement-sam-abdullaev-j4ede",
    "month": 1,
    "year": 2025
  },
  {
    "title": "December 2024: Development",
    "url": "https://www.linkedin.com/pulse/december-2024-development-sam-abdullaev-9htse",
    "month": 12,
    "year": 2024
  },
  {
    "title": "November 2024: Advancement",
    "url": "https://www.linkedin.com/pulse/november-2024-advancement-sam-abdullaev-hwise",
    "month": 11,
    "year": 2024
  },
  {
    "title": "October 2024: Exploration",
    "url": "https://www.linkedin.com/pulse/october-2024-exploration-sam-abdullaev-smx7e",
    "month": 10,
    "year": 2024
  },
  {
    "title": "September 2024: Reunion",
    "url": "https://www.linkedin.com/pulse/september-2024reunion-sam-abdullaev-op2ue",
    "month": 9,
    "year": 2024
  },
  {
    "title": "August 2024: Initiatives",
    "url": "https://www.linkedin.com/pulse/august-2024-initiatives-sam-abdullaev-yp4ee",
    "month": 8,
    "year": 2024
  },
  {
    "title": "July 2024: Preparation",
    "url": "https://www.linkedin.com/pulse/july-2024-preparation-sam-abdullaev-bxmse",
    "month": 7,
    "year": 2024
  },
  {
    "title": "June 2024: Perseverance",
    "url": "https://www.linkedin.com/pulse/june-2024-perseverance-sam-abdullaev-qaxve",
    "month": 6,
    "year": 2024
  },
  {
    "title": "May 2024: Innovation",
    "url": "https://www.linkedin.com/pulse/may-2024-innovation-sam-abdullaev-h0kee",
    "month": 5,
    "year": 2024
  },
  {
    "title": "April 2024: Adventures",
    "url": "https://www.linkedin.com/pulse/april-2024-adventures-sam-abdullaev-nmjne",
    "month": 4,
    "year": 2024
  },
  {
    "title": "March 2024: Connections",
    "url": "https://www.linkedin.com/pulse/march-2024-connections-sam-abdullaev-t1zpe",
    "month": 3,
    "year": 2024
  },
  {
    "title": "February 2024: Learning",
    "url": "https://www.linkedin.com/pulse/february-learning-sam-abdullaev-hkn9f",
    "month": 2,
    "year": 2024
  },
  {
    "title": "January 2024: Creativity",
    "url": "https://www.linkedin.com/pulse/january-2024-creativity-sam-abdullaev-w2y9e",
    "month": 1,
    "year": 2024
  },
  {
    "title": "December 2023: Community",
    "url": "https://www.linkedin.com/pulse/december-2023-community-sam-abdullaev-2pzge",
    "month": 12,
    "year": 2023
  },
  {
    "title": "November 2023: Progression",
    "url": "https://www.linkedin.com/pulse/november-2023-progression-samandar-abdullaev-780te",
    "month": 11,
    "year": 2023
  },
  {
    "title": "October 2023: Growth",
    "url": "https://www.linkedin.com/pulse/october-2023-month-growth-samandar-abdullaev-ettae",
    "month": 10,
    "year": 2023
  }
]

registerSeeder({
  name: 'journey',
  async up(client: SanityClient) {
    for (const [i, e] of entries.entries()) {
      await client.createOrReplace({
        _id: `journey-${e.year}-${String(e.month).padStart(2, '0')}`,
        _type: 'journeyUpdate',
        title: e.title,
        month: e.month,
        year: e.year,
        linkedInUrl: e.url,
        order: i + 1,
      })
    }
    console.log(`     Created ${entries.length} journey entries`)
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "journeyUpdate"]'})
  },
})
