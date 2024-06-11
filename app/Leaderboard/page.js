'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { database } from '../bdConfig';
import { get, ref, update } from 'firebase/database';
import styles from '../styles/lb.module.css';

import { useContext } from 'react';
import { UserContext } from '../UserContext';

const LeaderboardTable = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersSnapshot = await get(ref(database, 'users'));
        if (usersSnapshot.exists()) {
          const leaderboardData = Object.values(usersSnapshot.val()).sort(
            (a, b) => b.score - a.score
          );
          setLeaderboard(leaderboardData);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.main}>
      <div>
        <h1 className={styles.h1}>Таблица лидеров</h1>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ранг</th>
              <th>Имя игрока</th>
              <th>Счёт</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={player.login}>
                <td>{index + 1}</td>
                <td>{player.login}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className={styles.btn} onClick={() => router.push('/')}>
          На главную
        </button>
        {userLogin !== null && (
          <button className={styles.btn} onClick={() => router.push('/game')}>
            Назад в игру
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
