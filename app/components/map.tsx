'use client'
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapProps {
  incident: any;
  fetchIncidentByBounds: (minLat: number, minLng: number, maxLat: number, maxLng: number) => void;
}

export default function Map({ incident, fetchIncidentByBounds }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<any>(null);
    const markerRef = useRef<any[]>([]);
    const advancedMarkerRef = useRef<any>(null);
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
      console.log('Current bounds:', { minLat, minLng, maxLat, maxLng });
      fetchIncidentByBounds(minLat, minLng, maxLat, maxLng);
    }

    const recenterMap = (lat: number, lng: number, zoom: number = 10) => {
      if (!googleMapRef.current) return;
      
      googleMapRef.current.setCenter({ lat, lng });
      googleMapRef.current.setZoom(zoom);
      
      // // Fetch incidents for the new location after a short delay to let the map settle
      // setTimeout(() => {
      //   getBounds();
      // }, 500);
    }

    const updateIncident = () => {
      if (!googleMapRef.current) return;
      
      // Clear existing markers first
      markerRef.current.forEach(marker => {
        marker.setMap(null);
      });
      markerRef.current.forEach(glowOuterMarker => {
        glowOuterMarker.setMap(null);
      });
      markerRef.current.forEach(glowInnerMarker => {
        glowInnerMarker.setMap(null);
      });
      markerRef.current = [];
      
      // Add new markers
      
      console.log("update map Incident incident", incident);
      incident && incident.forEach((incidentItem: any) => {
        try {
          const position = { lat: parseFloat(incidentItem.latitude), lng: parseFloat(incidentItem.longitude) };
          
          // Validate position coordinates
          if (isNaN(position.lat) || isNaN(position.lng)) {
            console.warn('Invalid coordinates for incident:', incidentItem);
            return;
          }
          
          // Create a custom marker icon
          const markerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#00C853',
            fillOpacity: 1,
            strokeColor: '#0b5',
            strokeWeight: 2,
          };
          const glowOuterIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 23,
            fillColor: '#00C853',
            fillOpacity: 0.12,
            strokeWeight: 0,
          } as google.maps.Symbol;

          const glowInnerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 16,
            fillColor: '#00C853',
            fillOpacity: 0.22,
            strokeWeight: 0,
          } as google.maps.Symbol;
          
          const marker = new advancedMarkerRef.current({
            map: googleMapRef.current,
            position: position,
            icon: markerIcon,
            title: incidentItem.id,
          });
          const glowOuterMarker = new advancedMarkerRef.current({
            map: googleMapRef.current,
            position: position,
            icon: glowOuterIcon,
            title: incidentItem.id,
          });
          const glowInnerMarker = new advancedMarkerRef.current({
            map: googleMapRef.current,
            position: position,
            icon: glowInnerIcon,
            title: incidentItem.id,
          });
         
          markerRef.current.push(marker);
        } catch (error) {
          console.error('Error creating marker for incident:', incidentItem, error);
        }
      });
    }
    
    useEffect(() => {
      const initMap = async () => {
        if (googleMapRef.current || !mapRef.current) return;
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          version: "weekly",
        });
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;
        advancedMarkerRef.current = Marker;
        const center = { lat: 34.044727, lng: -118.249283 };
        const mapOptions = {
          center: center,
          zoom: 10,
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.attraction",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.school",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.park",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        };
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        googleMapRef.current = map;
        
        updateIncident();
      }
      initMap();
    }, []);

    useEffect(() => {
      updateIncident();
    }, [incident]);

    return (
      <div className="space-y-4">
        <div ref={mapRef} className="w-full h-96 border border-primary/20 rounded-lg"/>
        
        {/* Location Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={() => recenterMap(33.7175, -117.8311, 12)}
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md font-mono text-sm transition-colors"
          >
            Orange County
          </button>
          <button 
            onClick={() => recenterMap(25.7617, -80.1918, 12)}
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md font-mono text-sm transition-colors"
          >
            Miami
          </button>
          <button 
            onClick={() => recenterMap(40.7128, -74.0060, 12)}
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md font-mono text-sm transition-colors"
          >
            New York City
          </button>
          <button 
            onClick={() => getBounds()}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-mono text-sm transition-colors ml-auto"
          >
            Refresh Incidents
          </button>
        </div>
      </div>
    )
}