import { AccessArgs, CollectionConfig, CollectionSlug } from 'payload'
import { z } from 'zod'

const routeParamsParser = z.object({
  collection: z.string(),
})

const ownerPropertyCheck = z.object({
  owner: z.string(),
})

const adminOrOwner = async ({
  req,
  data,
  id,
}: AccessArgs): Promise<boolean> => {
  console.log(req.user)
  if (req.user?.collection === 'admins') return true

  const collection: CollectionSlug = routeParamsParser.safeParse(
    req.routeParams
  ).collection

  if (id) {
    const collectionItem = await req.payload.findByID({
      collection: collection,
      id: id,
    })

    const owner = ownerPropertyCheck.safeParse(collectionItem)

    return owner.data?.owner === req.user?.id
  }

  return false
}

export const AdminOrOwnerAccessGuard: CollectionConfig['access'] = {
  admin: adminOrOwner,
  create: adminOrOwner,
  read: () => true,
  readVersions: adminOrOwner,
  unlock: adminOrOwner,
  update: adminOrOwner,
}
