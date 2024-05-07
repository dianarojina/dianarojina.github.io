export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <style> {`
        #main {
          background-color: #faffbf;

        }
      `}
      </style>
      <body>{children}</body>
    </html>
  )
}