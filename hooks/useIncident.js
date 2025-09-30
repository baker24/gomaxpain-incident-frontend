'use client'
import { useState, useEffect } from "react";

export default function useIncident() {
    const [incident, setIncident] = useState(null);
    const [count, setCount] = useState(0);


    const fetchIncident = async () => {
        try {
            const response = await fetch(`/api`);
            console.log('fetchIncident response:', response);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setIncident(data);
            setCount(count + 1);
            // console.log('fetchIncident data:',count, response.status, data);
        } catch (error) {
            console.error('fetchIncident error:', error);
        }
    }

    const fetchIncidentByBounds = async (minLat, minLng, maxLat, maxLng) => {
        try {
            console.log('fetchIncidentByBounds - Bounds:', { minLat, minLng, maxLat, maxLng });
            console.log('fetchIncidentByBounds - Current incident before clear:', incident);
            
            // Clear existing incident data first
            setIncident(null);
            console.log('fetchIncidentByBounds - Set incident to null');
            
            const response = await fetch(`/api?minLat=${minLat}&minLng=${minLng}&maxLat=${maxLat}&maxLng=${maxLng}`);
            console.log('fetchIncidentByBounds response:', response);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('fetchIncidentByBounds - Received data:', data, 'Length:', Array.isArray(data) ? data.length : 'not array');
            
            setIncident(data);
            console.log('fetchIncidentByBounds - Set incident to new data');
        } catch (error) {
            console.error('fetchIncidentByBounds error:', error);
        }
    }
    

    useEffect(() => {
        fetchIncident();
        const interval = setInterval(fetchIncident, 100000);
        return () => clearInterval(interval);
    }, []);


    return { incident, setIncident, fetchIncident, fetchIncidentByBounds };
}