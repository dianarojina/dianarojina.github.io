import StreetView from './StreetView';
import Styles from './layout.module.css';

const API_KEY = process.env.API_KEY;

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
        <div className={Styles.main}>
          <h1>Where am I?</h1>
          <StreetView />
          {children}
        </div>
      </body>
    </html>
  );
}
