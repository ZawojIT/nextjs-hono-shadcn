import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { userFormSchema } from '@/hooks/users/schema'
import { payload } from './payload'
export const runtime = 'nodejs'

const app = new Hono().basePath('/api/v1')

app.get('/hello', async (c) => {
  
  const users = await payload.find({
    collection: 'users',
  })

  return c.json({
    message: 'Hello Next.js!',
    users,
  })
})

app.post('/user', zValidator('json', userFormSchema), async (c) => {
  const data = c.req.valid('json')

  // Tutaj możesz dodać logikę przetwarzania danych
  // np. zapis do bazy danych
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return c.json({
    success: true,
    message: 'Dane zostały pomyślnie zapisane',
    data,
  })
})

export const GET = handle(app)
export const POST = handle(app)