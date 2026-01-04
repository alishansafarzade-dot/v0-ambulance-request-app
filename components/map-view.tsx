"use client"

import type { Location } from "@/lib/types"
import { MapPin } from "lucide-react"

interface MapViewProps {
  location: Location
}

export function MapView({ location }: MapViewProps) {
  // Using OpenStreetMap with Leaflet-style tile URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01},${location.latitude - 0.01},${location.longitude + 0.01},${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`

  return (
    <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden border">
      <iframe src={mapUrl} className="w-full h-full" style={{ border: 0 }} loading="lazy" title="Location Map" />
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <MapPin className="h-4 w-4 text-red-600" />
        <div className="text-xs">
          <p className="font-semibold">{location.address}</p>
          <p className="text-muted-foreground">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
}
