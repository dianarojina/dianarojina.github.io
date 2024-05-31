'use client';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from './bdConfig';

export interface Position {
  lat: number;
  lng: number;
}

export let globalLat: number | null = null; // Declare the global variable
export let globalLng: number | null = null; // Declare the global variable

const StreetView = () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const pointsRef = ref(database, 'points');
        const snapshot = await get(pointsRef);

        if (snapshot.exists()) {
          const pointsData = snapshot.val();
          const secondPointKey = Object.keys(pointsData)[1]; // Assuming the second point is the one you want to use
          const secondPoint = pointsData[secondPointKey];
          setPosition({ lat: secondPoint.lat, lng: secondPoint.lng });
          globalLat = secondPoint.lat; // Assign the latitude value to the global variable
          globalLng = secondPoint.lng; // Assign the latitude value to the global variable
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
