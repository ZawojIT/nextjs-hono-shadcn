import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './payload/collections/Media'
import { Posts } from './app/(app)/posts/config/Posts'
import { Admins } from './payload/collections/Admins'
import { Users } from './app/(app)/users/config/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: "gravatar",
  },
  collections: [Admins, Media, Posts, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      // ssl: getSSLConfig(process.env.SSL_CERT_PATH, process.env.SSL_KEY_PATH),
    },
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
