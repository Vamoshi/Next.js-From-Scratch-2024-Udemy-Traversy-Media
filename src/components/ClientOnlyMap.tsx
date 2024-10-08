'use client'

import React, { ReactNode } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type Props = {
    lat: number;
    lng: number;
    popupDescription: string | ReactNode
}

// This tries to access the document, so we need to make it into an ssr:false
const ClientOnlyMap = ({ lat, lng, popupDescription }: Props) => {
    const icon = L.icon({
        iconUrl: '/images/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={12}
            style={{ width: '100%', height: '500px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={icon}>
                <Popup>
                    {popupDescription}
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default ClientOnlyMap;
