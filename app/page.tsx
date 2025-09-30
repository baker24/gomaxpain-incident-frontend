'use client'
import Image from "next/image";
import Map from "./components/map";
import Table from "./components/table";
import useIncident from "@/hooks/useIncident";
import IncidentPopup from "./components/incidentpopup";
import { useState } from "react";

export default function Home() {
  const { incident, setIncident, fetchIncident, fetchIncidentByBounds } = useIncident();
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log("page incident", incident);

  const handleSelectIncident = (incident: any) => {
    setSelectedIncident(incident);
    setIsPopupOpen(true);
  }
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedIncident(null);
  }


  return (
    <div className="min-h-screen bg-background grid-bg p-6">
      <div className="mb-6">
      <h1 className="text-3xl font-bold text-foreground">
        INCIDENT<span className="text-primary">_MONITOR</span>
      </h1>
      <div className="h-px bg-secondary my-4" />
      </div>

      <Map incident={incident} fetchIncidentByBounds={fetchIncidentByBounds} /> 

      
      {/* Incident Details Popup */}
      <IncidentPopup 
            incident={selectedIncident}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
      <div>
        <h2 className="text-2xl font-bold text-foreground">Incidents</h2>
        <div className="border border-primary/20 rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
          <Table incident={incident} onSelectIncident={handleSelectIncident} />
        </div>
      </div>

    </div>
  );
}
