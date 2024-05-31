'use client';
import { get, ref } from 'firebase/database';
import { database } from './bdConfig';
import { useState } from 'react';

export default function Page() {
  const [inputCity, setInputCity] = useState('');
  const [foundCity, setFoundCity] = useState('');
  const [message, setMessage] = useState('');

  const checkCity = () => {
    const pointsRef = ref(database, 'points');
    get(pointsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const points = snapshot.val();
          const matchingCity = points.find((point) =>
            point?.city?.toLowerCase().includes(inputCity.toLowerCase())
          );

          if (matchingCity) {
            setFoundCity(matchingCity.city);
            setMessage(`Правильно, это ${matchingCity.city}!`);
          } else {
            setFoundCity('');
            setMessage(`Это не "${inputCity}"! Подумай еще.`);
          }
        } else {
          console.log('Нет данных...');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Произошла ошибка при проверке города...');
      });
  };

  return (
    <div>
      <h1>Какой это город?</h1>
      <div>
        <input
          id="city"
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button id="btn" onClick={checkCity}>
          Check City
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}
