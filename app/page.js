'use client';
import { useRouter } from 'next/navigation';
import Styles from './styles/page.module.css';

const Page = () => {
  const router = useRouter();
  return (
    <div className={Styles.startPage}>
      <div className={Styles.container3}>
        <h1 className={Styles.h1}>ГОРОДА РОССИИ</h1>
      </div>
      <div className={Styles.container1}>
        <a className={Styles.playBtn} href="/LoginPage"></a>
      </div>
      <div className={Styles.container2}>
        <button
          type="button"
          className={Styles.btn}
          onClick={() => router.push('/LoginPage')}
        >
          Войти
        </button>
        <button
          type="button"
          className={Styles.btn}
          onClick={() => router.push('/RegisterPage')}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default Page;
