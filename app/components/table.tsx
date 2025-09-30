'use client'

interface TableProps {
    incident: any;
    onSelectIncident?: (incident: any) => void;
}

export default function Table({ incident , onSelectIncident }: TableProps) {

    

    const handleSelectIncident = (incident: any) => {
        if (onSelectIncident && typeof onSelectIncident === 'function') {
            onSelectIncident(incident);
        } else {
            console.error("onSelectIncident is not a function:", onSelectIncident);
        }
    }



    console.log("Table component - incident:", incident, "Type:", typeof incident, "Length:", Array.isArray(incident) ? incident.length : 'not array');
    return (
        <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b border-primary/30">
              <tr className="border-b border-primary/30 transition-colors hover:bg-primary/5">
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  ID
                </th>
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  EVENT
                </th>
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  INTERSECTION
                </th>
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  CITY
                </th>
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  LATITUDE, LONGITUDE
                </th>
                <th className="h-14 px-6 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
                  CREATED_AT
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
                {incident && incident.length > 0 ? (
                    incident.map((incident: any) => incident.intersection !== "" && (
                        <tr key={incident.id} className="border-b border-primary/10 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 cursor-pointer" onClick={() => handleSelectIncident(incident)}>
                            <td className="p-4 align-middle font-mono text-sm text-foreground/90">{incident.id}</td>
                            <td className="p-4 align-middle font-mono text-sm text-foreground/90">{incident.event}</td>
                            <td className="p-4 align-middle font-mono text-sm text-foreground/90">{incident.intersection}</td>
                            <td className="p-4 align-middle font-mono text-sm text-foreground/90">{incident.city}</td>
                            <td className="p-4 align-middle font-mono text-sm text-foreground/90">{incident.latitude}, {incident.longitude}</td>
                            <td className="p-4 align-middle font-mono text-xs text-foreground/90">{incident.createdAt}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground font-mono text-sm">
                            {incident === null ? "Loading..." : "No incidents found in this area"}
                        </td>
                    </tr>
                )}
              
            </tbody>
          </table>
    )
}