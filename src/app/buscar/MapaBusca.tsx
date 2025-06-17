import React from "react";
import { MapContainer, TileLayer, Circle as LeafletCircle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

export default function MapaBusca({ raioKm, center }: { raioKm: number, center: LatLngExpression }) {
  return (
    <MapContainer
      key={(Array.isArray(center) ? center.join('-') : String(center)) + '-' + raioKm}
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "192px", borderRadius: "0.75rem" }}
      dragging={true}
      doubleClickZoom={true}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} />
      <LeafletCircle center={center} radius={raioKm * 1000} pathOptions={{ color: "#a259cb", fillColor: "#a259cb", fillOpacity: 0.2 }} />
    </MapContainer>
  );
} 