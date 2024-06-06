'use client';
import { useRouter } from 'next/navigation';
const API_KEY = process.env.API_KEY;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`}
        />
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <button onClick={() => handleNavigation('/')}>Home</button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/signup')}>
                Signup
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/login')}>Login</button>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
