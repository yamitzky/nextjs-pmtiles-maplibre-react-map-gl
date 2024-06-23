import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import layers from "protomaps-themes-base";
import { useEffect, useState } from "react";
import {
	Map as MapLibre,
	NavigationControl,
	type MapStyle,
	type ViewState,
} from "react-map-gl/maplibre";

const PMTILES_URL =
	"pmtiles://https://data.source.coop/protomaps/openstreetmap/tiles/v3.pmtiles";
const ATTRIBUTION = `<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>`;

export default function Home() {
	const [viewState, setViewState] = useState<Partial<ViewState>>({
		longitude: 139.25332664050575,
		latitude:  36.40122352836117,
		zoom: 5,
	});

	const [mapStyle, setMapStyle] = useState<MapStyle>();
	useEffect(() => {
		const protocol = new Protocol();
		maplibregl.addProtocol("pmtiles", protocol.tile);
		const defaultLayerStyles = layers("pmtiles", "dark");

		setMapStyle({
			version: 8,
			glyphs:
				"https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
			sprite: "https://protomaps.github.io/basemaps-assets/sprites/v3/light",
			sources: {
				pmtiles: {
					type: "vector",
					url: PMTILES_URL,
					attribution: ATTRIBUTION,
				},
			},
			layers: defaultLayerStyles,
		});
		return () => {
			maplibregl.removeProtocol("pmtiles");
		};
	}, []);

	return (
		<main className="w-full h-screen">
			<MapLibre
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapLib={maplibregl}
				mapStyle={mapStyle}
				style={{ width: "100%", height: "100%" }}
			>
				<NavigationControl position="top-left" />
			</MapLibre>
		</main>
	);
}
