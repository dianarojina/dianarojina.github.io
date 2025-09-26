'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, ref, update } from 'firebase/database';
import { database } from '../firebase/bdConfig.js';
import StreetView from '../StreetView';
import styles from '../styles/layout.module.css';

import { useContext } from 'react';
import { UserContext } from '../UserContext';

//import useLocalStorage from '../localStor';

const Game = () => {
  const [inputCity, setInputCity] = useState('');
  const [message, setMessage] = useState('');
  const [pointsData, setPointsData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const router = useRouter();
  const { userLogin, setUserLogin } = useContext(UserContext);

  //const [scoreL, setScoreL] = useLocalStorage('score', 0);

  const handleLogout = () => {
    setUserLogin(null);
    router.push('/');
  };

  const resetGame = () => {
    setInputCity('');
    setMessage('');
    setCurrentIndex(0);
    setScore(0);
    // setScoreL(scoreL * 0);
    setShowModal(false);
    setIsGameOver(false);
  };

  const updateUserScore = async () => {
    try {
      // Get a reference to the user's document
      const userRef = ref(database, `users/${userLogin}`);

      // Fetch the current user's score from the database
      const snapshot = await get(userRef);
      const databaseScore = snapshot.val()?.score || 0;

      // Update the user's score only if the current score is greater
      if (score > databaseScore) {
        let scores = score + 1;
        await update(userRef, {
          score: scores,
        });
      }
    } catch (error) {
      console.error('Error updating user score:', error);
    }
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
          //setScoreL(scoreL + 1);

          setModalMessage(text);
          setShowModal(true);

          // Update the user's score in the database
          await updateUserScore();
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
          <button className={styles.btn} onClick={checkCity}>
            Проверить
          </button>
        </div>
        <div className={styles.controls_con}>
          <h2>
            {userLogin} у тебя {score} монет
          </h2>
        </div>
        <div className={styles.controls_con}>
          <button
            className={styles.btn}
            onClick={() => router.push('/Leaderboard')}
          >
            Лидерборд
          </button>
          <button className={styles.btn} onClick={handleLogout}>
            Выйти
          </button>
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

export default Game;
