"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Incident } from "@/types/data";
import { mapstyle } from "@/app/components/map/constants/mapstyle";
import State, { City, states } from "@/types/states";
import { logger } from "@/services/logger";

interface MapProps {
	incident: Incident[] | null;
	fetchIncidentByBounds: (
		minLat: number,
		minLng: number,
		maxLat: number,
		maxLng: number
	) => void;
	onSelectIncident?: (incident: Incident) => void;
}

export default function Map({
	incident,
	fetchIncidentByBounds,
	onSelectIncident,
}: MapProps) {
	const [activeState, setActiveState] = useState<State | null>(null);
	const [activeCity, setActiveCity] = useState<City | null>(null);
	const [showWeather, setShowWeather] = useState(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const googleMapRef = useRef<google.maps.Map | null>(null);
	const markerRef = useRef<google.maps.Marker[]>([]);
	const advancedMarkerRef = useRef<typeof google.maps.Marker | null>(null);
	const coverageRectanglesRef = useRef<google.maps.Rectangle[]>([]);
	const [precipitationLayer, setPrecipitationLayer] =
		useState<google.maps.ImageMapType | null>(null);
	const [windLayer, setWindLayer] = useState<google.maps.ImageMapType | null>(
		null
	);
	const [showWind, setShowWind] = useState(false);
	const getBounds = () => {
		if (!googleMapRef.current) return;

		const bounds = googleMapRef.current.getBounds();
		if (!bounds) return;

		const ne = bounds.getNorthEast();
		const sw = bounds.getSouthWest();

		const minLat = sw.lat();
		const minLng = sw.lng();
		const maxLat = ne.lat();
		const maxLng = ne.lng();
		fetchIncidentByBounds(minLat, minLng, maxLat, maxLng);
	};

	const recenterMap = (lat: number, lng: number, zoom: number) => {
		if (!googleMapRef.current) return;

		googleMapRef.current.setCenter({ lat, lng });
		googleMapRef.current.setZoom(zoom);
	};

	const updateIncident = () => {
		if (!googleMapRef.current) return;

		// Clear existing markers first
		markerRef.current.forEach((marker) => {
			marker.setMap(null);
		});
		markerRef.current.forEach((glowOuterMarker) => {
			glowOuterMarker.setMap(null);
		});
		markerRef.current.forEach((glowInnerMarker) => {
			glowInnerMarker.setMap(null);
		});
		markerRef.current = [];

		// Add new markers

		incident &&
			Array.isArray(incident) &&
			incident.forEach((incidentItem: Incident) => {
				try {
					const position = {
						lat: Number(incidentItem.latitude),
						lng: Number(incidentItem.longitude),
					};

					// Validate position coordinates
					if (isNaN(position.lat) || isNaN(position.lng)) {
						return;
					}
					const svglink =
						"https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/18-512.png";

					// Create a custom marker icon
					const svgIcon = {
						url: svglink,
						scaledSize: new google.maps.Size(18, 18),
					};

					const markerIcon = {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 5,
						fillColor: "red",
						fillOpacity: 1,
						strokeColor: "red",
						strokeWeight: 2,
					};
					const glowOuterIcon = {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 11.5,
						fillColor: "red",
						fillOpacity: 0.12,
						strokeWeight: 0,
					} as google.maps.Symbol;

					const glowInnerIcon = {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 8,
						fillColor: "red",
						fillOpacity: 0.22,
						strokeWeight: 0,
					} as google.maps.Symbol;

					if (advancedMarkerRef.current) {
						const marker = new advancedMarkerRef.current({
							map: googleMapRef.current,
							position: position,
							icon: markerIcon,
							title: incidentItem.id,
						});
						new advancedMarkerRef.current({
							map: googleMapRef.current,
							position: position,
							icon: glowOuterIcon,
							title: incidentItem.id,
						});
						new advancedMarkerRef.current({
							map: googleMapRef.current,
							position: position,
							icon: glowInnerIcon,
							title: incidentItem.id,
						});

						markerRef.current.push(marker);
					}
				} catch (error) {
					logger.error("updateIncident error:", error);
				}
			});
	};

	const drawCoverageAreas = async () => {
		if (!googleMapRef.current) return;

		// Clear existing rectangles
		coverageRectanglesRef.current.forEach((rect) => rect.setMap(null));
		coverageRectanglesRef.current = [];

		try {
			const API_URL =
				process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
			const response = await fetch(`${API_URL}/metrics/coverage-areas`);

			if (!response.ok) {
				console.error("Failed to fetch coverage areas");
				return;
			}

			const result = await response.json();
			const boundingBoxes = result.data || [];

			// Draw rectangles for each bounding box
			boundingBoxes.forEach((bbox: any) => {
				const rectangle = new google.maps.Rectangle({
					bounds: {
						north: bbox.tr_lat,
						south: bbox.bl_lat,
						east: bbox.tr_lon,
						west: bbox.bl_lon,
					},
					strokeColor: "#00FF00",
					strokeOpacity: 0.6,
					strokeWeight: 2,
					fillColor: "#00FF00",
					fillOpacity: 0.1,
					map: googleMapRef.current,
				});

				coverageRectanglesRef.current.push(rectangle);
			});

			logger.info("Coverage areas drawn", {
				count: boundingBoxes.length,
			});
		} catch (error) {
			console.error("Error drawing coverage areas:", error);
		}
	};

	useEffect(() => {
		const initMap = async () => {
			if (googleMapRef.current || !mapRef.current) return;
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
				version: "weekly",
			});
			const { Map } = await loader.importLibrary("maps");
			const { Marker } = (await loader.importLibrary(
				"marker"
			)) as google.maps.MarkerLibrary;
			advancedMarkerRef.current = Marker;
			const center = { lat: 35.906, lng: -100.05 };
			const mapOptions = {
				center: center,
				zoom: 5,
				fullscreenControl: false,
				mapTypeControl: false,
				streetViewControl: false,
				styles: mapstyle,
			};
			const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
			googleMapRef.current = map;

			const WeatherLayer = new google.maps.ImageMapType({
				getTileUrl: (coord: google.maps.Point, zoom: number) => {
					const tileRange = 1 << zoom; // total tiles in x/y at this zoom
					let x = ((coord.x % tileRange) + tileRange) % tileRange; // wrap x horizontally
					const y = coord.y; // y as-is
					if (y < 0 || y >= tileRange) return null;
					const layer = "precipitation_new";
					return `https://tile.openweathermap.org/map/precipitation_new/${zoom}/${x}/${y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
				},
				tileSize: new google.maps.Size(256, 256),
				name: "Weather Overlay",
				opacity: 1.0,
			});
			setPrecipitationLayer(WeatherLayer);
			const WindLayer = new google.maps.ImageMapType({
				getTileUrl: (coord: google.maps.Point, zoom: number) => {
					const tileRange = 1 << zoom; // total tiles in x/y at this zoom
					let x = ((coord.x % tileRange) + tileRange) % tileRange; // wrap x horizontally
					const y = coord.y; // y as-is
					if (y < 0 || y >= tileRange) return null;
					const layer = "wind_new";
					return `https://tile.openweathermap.org/map/wind_new/${zoom}/${x}/${y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
				},
				tileSize: new google.maps.Size(256, 256),
				name: "Wind Overlay",
				opacity: 1.0,
			});
			setWindLayer(WindLayer);

			// Draw coverage areas
			drawCoverageAreas();

			updateIncident();
		};
		initMap();
	}, []);

	useEffect(() => {
		updateIncident();
	}, [incident]);

	const handleStateClick = (state: State) => {
		setActiveState(state);
		recenterMap(state.latitude, state.longitude, 6.5);
	};

	const handleCityClick = (city: City) => {
		setActiveCity(city);
		recenterMap(city.latitude, city.longitude, 12);
	};

	const removeOverlayLayer = (layer: google.maps.ImageMapType) => {
		if (!googleMapRef.current) return;

		const overlayMap = googleMapRef.current.overlayMapTypes;
		const index = overlayMap
			.getArray()
			.findIndex((overlay) => overlay === layer);
		if (index !== -1) {
			overlayMap.removeAt(index);
		}
	};

	const toggleWeather = () => {
		if (showWeather) {
			removeOverlayLayer(precipitationLayer as google.maps.ImageMapType);
			setShowWeather(false);
		} else {
			googleMapRef.current?.overlayMapTypes.push(precipitationLayer);
			setShowWeather(true);
		}
	};
	const toggleWind = () => {
		if (showWind) {
			removeOverlayLayer(windLayer as google.maps.ImageMapType);
			setShowWind(false);
		} else {
			googleMapRef.current?.overlayMapTypes.push(windLayer);
			setShowWind(true);
		}
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold text-foreground font-mono">
				Incident <span className="text-primary">HeatMap</span>
			</h2>

			<div className="h-px bg-primary/20 my-3" />
			<div className="flex justify-between">
				{/* Location Buttons */}
				<div className="flex gap-3 flex-wrap">
					{/* <h1 className="text-2xl font-bold text-foreground">States : </h1> */}
					{states.map((state) => (
						<button
							key={state.name}
							onClick={() => handleStateClick(state)}
							style={{
								backgroundColor:
									activeState?.name === state.name
										? "rgba(0, 123, 255, 0.1)"
										: "transparent",
							}}
							className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md font-mono text-sm transition-colors">
							{state.name}
						</button>
					))}
				</div>
				<div></div>
			</div>
			<div className="relative">
				<div
					ref={mapRef}
					className="w-full h-96 border border-primary/20 rounded-lg"
				/>
				<div
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						display: "flex",
						flexDirection: "column",
						gap: "4px",
						zIndex: 10,
					}}>
					<button
						onClick={() => toggleWeather()}
						className="px-4 py-2 border border-white/30 rounded-md font-mono text-sm transition-colors">
						Precipitation
					</button>
					<button
						onClick={() => toggleWind()}
						className="px-4 py-2  border border-white/30 rounded-md font-mono text-sm transition-colors">
						Wind
					</button>
				</div>
			</div>
		</div>
	);
}
