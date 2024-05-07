export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head><style> {`
        .main {
          background-color: #faffbf;
        }
      `}
      </style></head>
      <body>{children}</body>
    </html>
  );
}