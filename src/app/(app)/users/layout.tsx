export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>
      {children}
    </div>
  )
}
