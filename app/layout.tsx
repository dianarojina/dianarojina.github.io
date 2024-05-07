export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <style> {`
        .main {
          background-color: #faffbf;
          width: 100%;
          height: 100%;
          margin: auto;
        }
      `}
      </style>
      </head>
      <body>{children}</body>
    </html>
  )
}