import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = process.env.API_KEY;

const StreetView = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    loader.current = new Loader({
      apiKey: API_KEY,
      version: 'weekly',
    });

    loader.current.load().then(() => {
      setIsLoaded(true);
      initStreetView();
    });
  }, []);

  const initStreetView = () => {
    const fenway = { lat: 42.345573, lng: -71.098326 };
    const panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );
  };

  return isLoaded ? (
    <div id="pano" style={{ height: '500px', width: '100%' }} />
  ) : (
    <div>Loading...</div>
  );
};

export default StreetView;
