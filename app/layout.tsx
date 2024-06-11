const API_KEY = process.env.API_KEY;
import Style from './styles/layout.module.css';
import { UserProvider } from './UserContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
        />
      </head>
      <body className={Style.mainBody}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
