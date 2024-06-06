'use client';
import LoginPage from './pages/login';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div>
      {/* <LoginPage /> */}
      <button type="button" onClick={() => router.push('/signup')}>
        Регистрация
      </button>
    </div>
  );
};

export default Page;
