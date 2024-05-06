export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <style>{`
        body {
          background-color: aquamarine;
        }
        h1 {
          font-family: cursive;
        }
      `}
      </style>
      <body>{children}</body>
    </html>
  )
}