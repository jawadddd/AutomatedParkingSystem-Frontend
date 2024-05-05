import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import InputField from './InputField';
import styled from 'styled-components';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const InputFieldContainer = styled.div`
  position: absolute;
  top: 20px; /* Adjust as needed */
  left: 20px; /* Adjust as needed */
  z-index: 999; /* Ensure it's above the map */
`;

const Map = ({ coordinates, onMarkerMove }) => {
  const [marker, setMarker] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const handleMarker = (center) => {
    if (marker) {
      marker.setLngLat(center);
      mapRef.current.flyTo({
        center: center,
        zoom: 10,
        essential: true
      });

      // Call the parent function to update coordinates
      if (typeof onMarkerMove === 'function') {
        onMarkerMove(center);
      }
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamF3YWRkZCIsImEiOiJjbHNya2h2a2wwNGw1Mm5tbHdvd3d6bTZoIn0.s_p93Jzwa_4NdtUFgqMhYA';

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 10
      });

      const markerInstance = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      setMarker(markerInstance);
      mapRef.current = map;

      // Add event listener for window resize
      window.addEventListener('resize', () => {
        map.resize();
      });

      return () => {
        map.remove();
        window.removeEventListener('resize', () => {
          map.resize();
        });
      };
    });
  }, []);

  return (
    <MapContainer>
      <InputFieldContainer>
        <InputField handleMarker={handleMarker} />
      </InputFieldContainer>
      <div ref={mapContainerRef} style={{ width:'100%', height: '100%' }} />
    </MapContainer>
  );
};

export default Map;
