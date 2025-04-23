export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Example</h1>
      {children}
    </div>
  )
}
