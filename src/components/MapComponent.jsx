import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

const MapComponent = () => {
  const coords = useSelector((state) => state.registerMap.coords);
  const centerCoordinates =
    coords && coords.length === 2 ? coords : [51.505, -0.09];

  return (
    <MapContainer
      center={centerCoordinates}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={centerCoordinates}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
