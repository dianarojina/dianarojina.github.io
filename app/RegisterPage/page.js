'use client';
import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { database } from '../bdConfig';
import Style from '../styles/login.module.css';

import { setUserLogin } from '../UserContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // Добавление нового пользователя в базу данных
      await set(ref(database, 'users/' + name), {
        email,
        pass: password,
        score: 0, // Добавляем свойство score со значением 0
        login: name,
      });

      // Очистка полей ввода
      setName('');
      setEmail('');
      setPassword('');

      setUserLogin(name);

      // Перенаправление на страницу игры
      router.push('/game');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <div className={Style.main}>
      <h1 className={Style.h1}>РЕГИСТРАЦИЯ</h1>
      <form className={Style.form} onSubmit={handleRegister}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
