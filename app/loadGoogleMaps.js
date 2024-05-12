import React, { useEffect } from 'react';

const StreetView = () => {
  useEffect(() => {
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
  }, []);

  return <div id="pano" style={{ height: '500px', width: '100%' }} />;
};

export default StreetView;
