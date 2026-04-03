import {getClient, getSeeders} from './helpers.js'

// Import all seeders to register them
import './projects.seeder.js'
import './resources.seeder.js'
import './travel.seeder.js'
import './reviews.seeder.js'
import './blog.seeder.js'
import './journey.seeder.js'
import './certificates.seeder.js'
import './mentorship.seeder.js'

const client = getClient()
const args = process.argv.slice(2)
const command = args[0] // 'up' or 'down'
const filter = args.slice(1) // optional seeder names

async function run() {
  const seeders = getSeeders()
  const toRun = filter.length > 0
    ? seeders.filter(s => filter.includes(s.name))
    : seeders

  if (toRun.length === 0) {
    console.log('No seeders matched. Available:', seeders.map(s => s.name).join(', '))
    return
  }

  for (const seeder of toRun) {
    console.log(`${command === 'up' ? '⬆' : '⬇'}  ${seeder.name}...`)
    try {
      if (command === 'up') await seeder.up(client)
      else if (command === 'down') await seeder.down(client)
      console.log(`   ✓ ${seeder.name} done`)
    } catch (err) {
      console.error(`   ✗ ${seeder.name} failed:`, err)
    }
  }
}

run().catch(console.error)
