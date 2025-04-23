export const apiRoutes = {
  hello: {
    base: '/api/hello',
    // Add more specific hello-related routes as needed
  },
  users: {
    base: '/api/users',
    create: '/api/user',
    detail: (id: string) => `/api/users/${id}`,
  },
  posts: {
    base: '/api/posts',
    create: '/api/posts',
    detail: (id: string) => `/api/posts/${id}`,
  },
  // Add other feature routes as needed
} as const
