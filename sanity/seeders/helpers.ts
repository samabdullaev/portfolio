import {createClient, type SanityClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import {randomBytes} from 'crypto'

// Read token from .env
const envPath = resolve(__dirname, '../.env')
let token = ''
try {
  const env = readFileSync(envPath, 'utf8')
  const match = env.match(/SANITY_TOKEN=(.+)/)
  if (match) token = match[1].trim()
} catch {}

export function getClient(): SanityClient {
  if (!token) throw new Error('SANITY_TOKEN not found in sanity/.env')
  return createClient({
    projectId: 'p43tljnq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

export function key(): string {
  return randomBytes(4).toString('hex')
}

export async function uploadImage(client: SanityClient, filePath: string): Promise<string> {
  const absolutePath = resolve(__dirname, '../../site', filePath)
  const buffer = readFileSync(absolutePath)
  const ext = filePath.split('.').pop() || 'png'
  const asset = await client.assets.upload('image', buffer, {
    filename: filePath.split('/').pop() || 'image.' + ext,
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })
  return asset._id
}

export function imageRef(assetId: string) {
  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: assetId},
  }
}

interface Seeder {
  name: string
  up: (client: SanityClient) => Promise<void>
  down: (client: SanityClient) => Promise<void>
}

const seeders: Seeder[] = []

export function registerSeeder(seeder: Seeder) {
  seeders.push(seeder)
}

export function getSeeders() {
  return seeders
}
