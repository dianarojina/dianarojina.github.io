'use client';
import { useEffect } from 'react';

const StreetView = () => {
  useEffect(() => {
    const fenway = { lat: 62.02757, lng: 129.731495 };
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano') as HTMLElement,
      {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );
  }, []);

  return (
    <div id="pano" style={{ height: '700px', width: '45%', margin: '10px' }} />
  );
};
//
export default StreetView;
