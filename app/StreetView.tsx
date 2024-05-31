'use client';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from './bdConfig';

interface Position {
  lat: number;
  lng: number;
}

const StreetView = () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const pointsRef = ref(database, 'points/1');
        const snapshot = await get(pointsRef);

        if (snapshot.exists()) {
          const { lat, lng } = snapshot.val();
          setPosition({ lat, lng });
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching position:', error);
      }
    };

    fetchPosition();
  }, []);

  useEffect(() => {
    if (position) {
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano') as HTMLElement,
        {
          position,
          pov: {
            heading: 34,
            pitch: 10,
          },
          addressControl: false,
          fullscreenControl: false,
          showRoadLabels: false,
        }
      );
    }
  }, [position]);

  return (
    <div
      id="pano"
      style={{ height: '700px', width: '45%', margin: '10px', border: '1px' }}
    />
  );
};

export default StreetView;
