'use client';
import { get, ref } from 'firebase/database';
import { database } from './bdConfig';
import { useState, useEffect } from 'react';
import { globalLat, globalLng } from './StreetView';

const Page = () => {
  const [inputCity, setInputCity] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (globalLat !== null && globalLng !== null) {
      setLoading(false);
    }
  }, [globalLat, globalLng]);

  const checkCity = () => {
    const pointsRef = ref(database, 'points');
    get(pointsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const points = snapshot.val();
          const matchingCity = Object.keys(points).find((city) =>
            city.toLowerCase().includes(inputCity.toLowerCase())
          );

          if (matchingCity) {
            const { lat, lng } = points[matchingCity];
            if (globalLat === lat && globalLng === lng) {
              setMessage(`Правильно, это ${matchingCity}!`);
            } else {
              setMessage(`Это не "${inputCity}"! Подумай еще.`);
            }
          } else {
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
};
export default Page();
