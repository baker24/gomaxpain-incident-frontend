"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Incident, Provider, ProviderPatient } from "@/types/data";
import { mapstyle } from "@/app/components/map/constants/mapstyle";
import State, { states } from "@/types/states";
import { logger } from "@/services/logger";

interface MapProps {
	incident: Incident[] | null;
	providers: Provider[] | null;
	providerPatients: ProviderPatient[] | null;
}

export default function Map({
	incident,
	providers,
	providerPatients,
}: MapProps) {
	const [activeState, setActiveState] = useState<State | null>(null);
	const [showWeather, setShowWeather] = useState(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const googleMapRef = useRef<google.maps.Map | null>(null);
	const markerRef = useRef<google.maps.Marker[]>([]);
	const advancedMarkerRef = useRef<typeof google.maps.Marker | null>(null);
	const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
	const [precipitationLayer, setPrecipitationLayer] =
		useState<google.maps.ImageMapType | null>(null);
	const [windLayer, setWindLayer] = useState<google.maps.ImageMapType | null>(
		null,
	);
	const [showWind, setShowWind] = useState(false);

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

		// Add incident markers (red)
		if (incident && Array.isArray(incident)) {
			incident.forEach((incidentItem: Incident) => {
				try {
					const lat = Number(incidentItem.latitude);
					const lon = Number(incidentItem.longitude);
					if (!isValidCoordinate(lat, lon)) return;

					addMarker({ lat, lng: lon }, "red", incidentItem.id);
				} catch (error) {
					logger.error("updateIncident error:", error);
				}
			});
		}

		// Add provider markers (DOCTOR, LAWYER, URGENT_CARE only; skip other types)
		// if (providers && Array.isArray(providers)) {
		// 	providers.forEach((provider) => {
		// 		try {
		// 			const lat = Number(provider.lat);
		// 			const lon = Number(provider.lon);
		// 			if (!isValidCoordinate(lat, lon)) return;

		// 			let color: string | null = null;
		// 			if (provider.type === "DOCTOR" || provider.type === "URGENT_CARE") {
		// 				color = "blue";
		// 			} else if (provider.type === "LAWYER") {
		// 				color = "white";
		// 			}
		// 			if (color === null) return;

		// 			const position = { lat, lng: lon };

		// 			let formattedAddress = "";
		// 			if (provider.area) {
		// 				try {
		// 					const parsed = JSON.parse(provider.area);
		// 					formattedAddress = parsed.formatted_address || "";
		// 				} catch {
		// 					formattedAddress = "";
		// 				}
		// 			}

		// 			const baseTitle = `${provider.firstName} ${provider.lastName} – ${provider.practiceName}`;
		// 			const fullTitle = formattedAddress
		// 				? `${baseTitle}\n${formattedAddress}`
		// 				: baseTitle;

		// 			const popupHtml = `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; line-height: 1.4; margin: 0; padding: 0;">
		// 					<div style="font-weight: 600; color: #000;">${provider.firstName} ${provider.lastName}</div>
		// 					<div style="font-weight: 600; color: #000;">${provider.practiceName}</div>
		// 					${
		// 						formattedAddress
		// 							? `<div style="margin-top: 4px; color: #4b5563;">${formattedAddress}</div>`
		// 							: ""
		// 					}
		// 				</div>`;

		// 			addMarker(position, color, fullTitle, popupHtml);
		// 		} catch (error) {
		// 			logger.error("update providers error:", error);
		// 		}
		// 	});
		// }

		// Add patient markers (yellow) - commented out for now
		// if (providerPatients && Array.isArray(providerPatients)) {
		// 	providerPatients.forEach((patient) => {
		// 		try {
		// 			const lat = Number(patient.lat);
		// 			const lon = Number(patient.lon);
		// 			if (!isValidCoordinate(lat, lon)) return;

		// 			const title = `${patient.firstName} ${patient.lastName} – ${patient.case}`;
		// 			const popupHtml = `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; line-height: 1.4; margin: 0; padding: 0;">
		// 					<div style="font-weight: 600; color: #000;">${patient.firstName} ${patient.lastName}</div>
		// 					<div style="font-weight: 600; color: #000;">Case: ${patient.case}</div>
		// 				</div>`;
		// 			addMarker({ lat, lng: lon }, "yellow", title, popupHtml);
		// 		} catch (error) {
		// 			logger.error("update patients error:", error);
		// 		}
		// 	});
		// }
	};

	const isValidCoordinate = (lat: number, lon: number) => {
		return (
			Number.isFinite(lat) && Number.isFinite(lon) && !(lat === 0 && lon === 0)
		);
	};

	const addMarker = (
		position: google.maps.LatLngLiteral,
		color: string,
		title?: string,
		popupContent?: string,
	) => {
		if (!advancedMarkerRef.current || !googleMapRef.current) return;

		const baseIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 5,
			fillColor: color,
			fillOpacity: 1,
			strokeColor: color,
			strokeWeight: 2,
		};

		const glowOuterIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 11.5,
			fillColor: color,
			fillOpacity: 0.12,
			strokeWeight: 0,
		} as google.maps.Symbol;

		const glowInnerIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 8,
			fillColor: color,
			fillOpacity: 0.22,
			strokeWeight: 0,
		} as google.maps.Symbol;

		const triangle: google.maps.Symbol = {
			path: "M 0,-1 1,1 -1,1 z",
			scale: 6,
			fillColor: color,
			fillOpacity: 1,
			strokeColor: "#000000",
			strokeOpacity: 0.7,
			strokeWeight: 1,
		};

		const diamond: google.maps.Symbol = {
			path: "M 0,-1 1,0 0,1 -1,0 z",
			scale: 6,
			fillColor: color,
			fillOpacity: 1,
			strokeColor: "#000000",
			strokeOpacity: 0.7,
			strokeWeight: 1,
		};

		const imageIcon: google.maps.Icon = {
			url: "/logo.png",
			scaledSize: new google.maps.Size(120, 38),
			anchor: new google.maps.Point(60, 38),
		};

		const marker = new advancedMarkerRef.current({
			map: googleMapRef.current,
			position,
			icon: triangle,
			title,
		});

		// new advancedMarkerRef.current({
		// 	map: googleMapRef.current,
		// 	position,
		// 	icon: glowOuterIcon,
		// 	clickable: false,
		// });

		// new advancedMarkerRef.current({
		// 	map: googleMapRef.current,
		// 	position,
		// 	icon: glowInnerIcon,
		// 	clickable: false,
		// });

		if (popupContent) {
			if (!infoWindowRef.current) {
				infoWindowRef.current = new google.maps.InfoWindow();
			}

			marker.addListener("mouseover", () => {
				if (!infoWindowRef.current || !googleMapRef.current) return;
				infoWindowRef.current.setContent(popupContent);
				infoWindowRef.current.open({
					anchor: marker,
					map: googleMapRef.current,
				});
			});

			marker.addListener("mouseout", () => {
				if (!infoWindowRef.current) return;
				infoWindowRef.current.close();
			});
		}

		markerRef.current.push(marker);
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
				"marker",
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
				zoomControl: true,
			};
			const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
			googleMapRef.current = map;

			const WeatherLayer = new google.maps.ImageMapType({
				getTileUrl: (coord: google.maps.Point, zoom: number) => {
					const tileRange = 1 << zoom; // total tiles in x/y at this zoom
					const x = ((coord.x % tileRange) + tileRange) % tileRange; // wrap x horizontally
					const y = coord.y; // y as-is
					if (y < 0 || y >= tileRange) return null;
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
					const x = ((coord.x % tileRange) + tileRange) % tileRange; // wrap x horizontally
					const y = coord.y; // y as-is
					if (y < 0 || y >= tileRange) return null;
					return `https://tile.openweathermap.org/map/wind_new/${zoom}/${x}/${y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
				},
				tileSize: new google.maps.Size(256, 256),
				name: "Wind Overlay",
				opacity: 1.0,
			});
			setWindLayer(WindLayer);

			updateIncident();
		};
		initMap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		updateIncident();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incident, providers, providerPatients]);

	const handleStateClick = (state: State | null) => {
		if (state === null) {
			setActiveState(null);
			recenterMap(35.906, -100.05, 4.5);
			return;
		}
		setActiveState(state);
		recenterMap(state.latitude, state.longitude, 6.5);
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
					<button
						onClick={() => handleStateClick(null)}
						style={{
							backgroundColor:
								activeState?.name === null
									? "rgba(0, 123, 255, 0.1)"
									: "transparent",
						}}
						className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md font-mono text-sm transition-colors">
						All
					</button>
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
				<div className="flex flex-col items-end gap-2 text-xs font-mono text-foreground/70">
					<div className="flex items-center gap-2">
						<span className="inline-block w-3 h-3 rounded-full bg-red-500" />
						<span>Incidents</span>
					</div>
					{/* <div className="flex items-center gap-2">
						<span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
						<span>Doctors</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="inline-block w-3 h-3 rounded-full bg-white border border-primary/40" />
						<span>Lawyers</span>
					</div> */}
				</div>
			</div>
			<div className="relative">
				<div
					ref={mapRef}
					className="w-full h-120 border border-primary/20 rounded-lg"
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
