'use client';

console.log("Client component rendered");

import { useState } from 'react';
import { database } from '../firebase/bdConfig.js';
import { get, ref } from 'firebase/database';
import { useRouter } from 'next/navigation';
import Style from '../styles/login.module.css';

import { useContext } from 'react';
import { UserContext } from '../UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { setUserLogin } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Получение пользователей из базы данных
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      // Проверка введенных данных
      const user = Object.values(users).find(
        (u) => u.email === email && u.pass === password
      );

      if (user) {
        // Успешный вход в систему
        //console.log('Вход выполнен успешно:', user);
        setUserLogin(user.login);
        router.push('/game');
      } else {
        alert('Неверный email или пароль');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <div className={Style.main}>
      <h1 className={Style.h1}>ВВЕДИТЕ EMAIL И ПАРОЛЬ</h1>
      <form className={Style.form} onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Войти</button>
        <p>У вас нет аккаунта?</p>
        <button type="button" onClick={() => router.push('/RegisterPage')}>
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
