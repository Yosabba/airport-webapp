"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

export function Map({ latitude, longitude, name, address }: MapProps) {
  useEffect(() => {
    // Force Leaflet to recalculate container size
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full rounded-lg"
      style={{ minHeight: "300px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>
          <div className="text-center">
            <strong>{name}</strong>
            <br />
            {address}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
