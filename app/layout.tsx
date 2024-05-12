import StreetView from './StreetView';

const API_KEY = process.env.API_KEY

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
      <body>
        <h1>Where am I?</h1>
        <StreetView />
        {children}
      </body>
    </html>
  );
}
