export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Posts</h1>
      {children}
    </div>
  )
}
