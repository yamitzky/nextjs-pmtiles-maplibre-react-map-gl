import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from 'react';
import Map, { NavigationControl, ViewState } from 'react-map-gl/maplibre';

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 139.7670,
    latitude: 35.6814,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: {top: 0, bottom: 0, left: 0, right: 0}
  });

  return (
    <main className="w-full h-screen">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapLib={maplibregl}
        mapStyle="https://demotiles.maplibre.org/style.json"
        style={{width: "100%", height: "100%"}}
      >
        <NavigationControl position="top-left" />
      </Map>
    </main>
  );
}
