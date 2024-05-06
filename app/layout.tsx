import Page from './page.js'
import React from 'react';

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Page />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }