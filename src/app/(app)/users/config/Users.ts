import { AdminOnlyAccessGuard } from '@/payload/access-guards/admin-only'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: AdminOnlyAccessGuard,
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
