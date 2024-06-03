'use client';
import { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { database } from './bdConfig';
import StreetView from './StreetView';
import styles from './layout.module.css';

const Page = () => {
  const [inputCity, setInputCity] = useState('');
  const [message, setMessage] = useState('');
  const [pointsData, setPointsData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [score, setScore] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = () => {
    setInputCity('');
    setMessage('');
    setCurrentIndex(0);
    setScore(0);
    setShowModal(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        const pointsRef = ref(database, 'points');
        const snapshot = await get(pointsRef);

        if (snapshot.exists()) {
          setPointsData(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    fetchPointsData();
  }, []);

  const checkCity = async () => {
    try {
      const points = pointsData;
      const matchingCity = Object.keys(points).find((city) =>
        city.toLowerCase().includes(inputCity.toLowerCase())
      );

      if (matchingCity) {
        const { lat, lng, text } = points[matchingCity];
        if (
          lat === Object.values(points)[currentIndex].lat &&
          lng === Object.values(points)[currentIndex].lng
        ) {
          setMessage(`Правильно, это ${matchingCity}!`);
          setCurrentIndex(
            Math.floor(Math.random() * Object.keys(points).length)
          );
          setScore((prevScore) => prevScore + 1);
          setModalMessage(text);
          setShowModal(true);
        } else {
          setIsGameOver(true);
          setMessage(false);
          setModalMessage('Вы ответили неправильно.');
          setShowModal(true);
        }
      } else {
        setIsGameOver(true);
        setMessage(false);
        setModalMessage('Вы ответили неправильно.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error checking city:', error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Какой это город?</h1>
      <div className={styles.controls}>
        <div className={styles.controls_con}>
          <input
            id="city"
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button id="btn" onClick={checkCity}>
            Проверить
          </button>
        </div>
        <div className={styles.controls_con}>
          <h2>Монетки {score} </h2>
        </div>
      </div>
      <div className={styles.wind}>
        <StreetView currentIndex={currentIndex} pointsData={pointsData} />
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            {<p>{message}</p>}
            <p>{modalMessage}</p>
            {isGameOver && (
              <button className={styles.btn} onClick={resetGame}>
                Начать сначала
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
