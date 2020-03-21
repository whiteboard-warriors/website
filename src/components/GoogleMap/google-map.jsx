import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

function MapView(props) {
  const [InfoWindow, setInfoWindow] = useState(null);

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      center={props.center}
      defaultOptions={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }}>
      <Marker position={props.event.geometry.location} onClick={() => setInfoWindow(props.event)} />)
      {InfoWindow &&
        <InfoWindow position={event.geometry.location} onCloseClick={() => setInfoWindow(null)}>
          <div>
            <h2>{"props.event.name"}</h2>
            <p>{"props.event.address"}</p>
          </div>
        </InfoWindow>
      }
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default function GoogleMap(props) {
  return (
    <WrappedMap
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAiEpmuGwx7VKZPj8QxyruJ1vv5iyOEMak'}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      zoom={props.zoom}
      center={props.center}
      event={props.event}
    />
  );
}
