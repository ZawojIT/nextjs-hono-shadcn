# NextJS + Hono + Shadcn + PayloadCMS

This project combines the following technologies:

- [Next.js](https://nextjs.org) - React framework with App Router
- [Hono](https://hono.dev/) - Lightweight web framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [PayloadCMS](https://payloadcms.com/) - Headless CMS with PostgreSQL database

## Prerequisites

- Node.js 18+ 
- PostgreSQL
- OpenSSL (for SSL certificate generation)

## Getting Started

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update your PostgreSQL connection string and other environment variables in `.env`:
```env
DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/postgress
PAYLOAD_SECRET=your-secret-key
```

### SSL Certificate Setup

1. Generate a self-signed SSL certificate:
```bash
cd ssl && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -subj "/CN=localhost" -addext "subjectAltName = DNS:localhost,IP:127.0.0.1"
```

2. Convert the certificate and key to base64 format:
```bash
base64 -i server.crt > server.crt.base64 && base64 -i server.key > server.key.base64
```

3. Trust the certificate (macOS):
   - Double-click `server.crt` in Finder
   - Open Keychain Access
   - Find the certificate and set it to "Always Trust"

### Development

Start the development server:

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

## SSL

```bash
cd ssl && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -subj "/CN=localhost" -addext "subjectAltName = DNS:localhost,IP:127.0.0.1"
```
The `server.key` and `server.crt` files will be used to generate a self-signed SSL certificate.
Convert the `server.key` to a base64 string:
```bash
base64 -i server.crt > server.crt.base64 && base64 -i server.key > server.key.base64
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/docs/getting-started/nextjs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [PayloadCMS Documentation](https://payloadcms.com/docs)

## Left to do

- [ ] Create example posts
- [ ] i18n support
- [ ] Error handling
- [ ] Mailing
- [ ] reCAPTCHA
- [ ] SEO
- [ ] Stripe
