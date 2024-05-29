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
        <script src="./bdConfig.js"></script>
      </head>
      <body>
        <div className={Styles.main}>
          <h1>Какой это город?</h1>
          <div>
            <input className={Styles.inp} />{' '}
            <button id="button">Проверить</button>
          </div>
          <StreetView />
          {children}
        </div>
        <script src="./scriptDB.js"></script>
      </body>
    </html>
  );
}
