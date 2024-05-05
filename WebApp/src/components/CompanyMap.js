import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import InputField from './InputField';
import styled from 'styled-components';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;


const CompanyMap = ({ coordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamF3YWRkZCIsImEiOiJjbHNya2h2a2wwNGw1Mm5tbHdvd3d6bTZoIn0.s_p93Jzwa_4NdtUFgqMhYA';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates[0], coordinates[1]],
      zoom: 10
    });

    const markerInstance = new mapboxgl.Marker()
      .setLngLat([coordinates[0], coordinates[1]])
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
  }, [coordinates]);

  return (
    <MapContainer>
      <div ref={mapContainerRef} style={{ width:'100%', height: '100%' }} />
    </MapContainer>
  );
};

export default CompanyMap;
