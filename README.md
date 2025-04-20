# NextJS + Hono + Shadcn + PayloadCMS

This project combines the following technologies:

- [Next.js](https://nextjs.org) - React framework with App Router
- [Hono](https://hono.dev/) - Lightweight web framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [PayloadCMS](https://payloadcms.com/) - Headless CMS with PostgreSQL database

## Getting Started

First, set up your environment variables:

```bash
# Copy the example .env file
cp .env.example .env
```

Make sure to update your PostgreSQL connection string in `.env`:

```
DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/postgress
PAYLOAD_SECRET=your-secret-key
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app and [http://localhost:3000/admin](http://localhost:3000/admin) to access the PayloadCMS admin panel.

## Project Structure

- `/src/app` - Next.js App Router
- `/src/components` - Reusable UI components
- `/src/collections` - PayloadCMS collection definitions
- `/src/lib` - Utility functions
- `/src/hooks` - React hooks

## Generating PayloadCMS Types

After making changes to your PayloadCMS collections, generate updated TypeScript types:

```bash
npm run generate:types
# or
yarn generate:types
# or
pnpm generate:types
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/docs/getting-started/nextjs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [PayloadCMS Documentation](https://payloadcms.com/docs)


## Left to do
- [ ] Server side tanstack query provider
- [ ] File upload example