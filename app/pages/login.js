'use client';
import { useState } from 'react';
import { database } from '../bdConfig';
import { get, ref } from 'firebase/database';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Получение пользователей из базы данных
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const users = Object.values(snapshot.val());

      // Проверка введенных данных
      const user = users.find(
        (u) => u.name === name && u.pass === parseInt(password)
      );

      if (user) {
        // Успешный вход в систему
        console.log('Вход выполнен успешно:', user);
        // Перенаправление на другую страницу
        router.push('/game');
      } else {
        console.error('Неверный email или пароль');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleLogin}>
        <label>
          Введите имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      </form>
    </div>
  );
};

export default LoginPage;
