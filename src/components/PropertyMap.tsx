/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { PropertyDocument } from '@/models'
import React, { useEffect, useState } from 'react'
import { setDefaults, fromAddress, GeocodeOptions } from "react-geocode"
import Spinner from './Spinner'
import Map, { MapboxMap, MapInstance, Marker } from "react-map-gl"
import DefaultImage from './DefaultImage'
import { Pin } from '@/assets/images'
import 'mapbox-gl/dist/mapbox-gl.css'
type Props = {
    property: PropertyDocument
}

const PropertyMap = ({ property }: Props) => {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [viewport, setViewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        height: "500px"
    })

    const [isLoading, setIsLoading] = useState(true)
    const [geocodeError, setGeocodeError] = useState(false)

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'CA'
    } as GeocodeOptions)

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const { street, state, city, zipcode } = property.location
                const res = await fromAddress(street || "" + city + state + zipcode)

                if (res.results.length === 0) {
                    setGeocodeError(true)
                    return
                }
                const { lat, lng } = res.results[0].geometry.location
                setLat(lat)
                setLng(lng)
                setViewPort({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                })
            } catch (error) {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                setGeocodeError(true)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchCoords()
    }, [property.location])

    if (isLoading) {
        return <Spinner size={"10vw"} />
    }

    if (geocodeError) {
        return <h3>No location data found</h3>
    }

    return (
        !isLoading &&
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={viewport}
            style={{ width: '100%', height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <DefaultImage src={Pin} width={40} height={40} />
            </Marker>
        </Map>
    )
}

export default PropertyMap