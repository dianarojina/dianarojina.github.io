'use client';
import { useEffect, useState } from 'react';
import { Position } from './types';

interface StreetViewProps {
  currentIndex: number;
  pointsData: Record<string, Position>;
}

const StreetView: React.FC<StreetViewProps> = ({
  currentIndex,
  pointsData,
}) => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (
      currentIndex !== null &&
      currentIndex >= 0 &&
      pointsData &&
      Object.values(pointsData)[currentIndex]
    ) {
      const { lat, lng } = Object.values(pointsData)[currentIndex];
      setPosition({ lat, lng });
    }
  }, [currentIndex, pointsData]);

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
      style={{ height: '700px', width: '85%', margin: '10px', border: '1px' }}
    />
  );
};

export default StreetView;
