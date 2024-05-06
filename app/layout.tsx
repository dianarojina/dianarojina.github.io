export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <style>
        .div1 {
          background-color: red;
          width: 100px;
          height: 100px;
        }
      </style>
      <body>
        <div class="div1">
            red
        </div>
      </body>
    </html>
  )
}