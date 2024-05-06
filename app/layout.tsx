export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="stylesheet" href="./styles.css" />
      <body>{children}</body>
    </html>
  )
}