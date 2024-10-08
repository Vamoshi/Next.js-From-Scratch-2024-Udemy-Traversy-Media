"use client"

import { PropertyDocument } from '@/models'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import dynamic from 'next/dynamic'

const ClientOnlyMap = dynamic(() => import('./ClientOnlyMap'), {
    ssr: false, // Disable server-side rendering for this component
});

type Props = {
    property: PropertyDocument
}

const PropertyMap = ({ property }: Props) => {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [geocodeError, setGeocodeError] = useState(false)
    const [address, setAddress] = useState("")

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const { street, state, city, zipcode } = property.location
                const queryAddress = `${street && street + ","} ${city}, ${state}, ${zipcode}`
                setAddress(queryAddress)

                // // Call geocode route
                const response = await fetch(`/api/geocode?address=${encodeURIComponent(queryAddress)}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch coordinates')
                }

                const data = await response.json()
                if (data.results.length === 0) {
                    setGeocodeError(true)
                    return
                }

                const { lat, lng } = data.results[0].geometry
                setLat(lat)
                setLng(lng)
            } catch (error) {
                console.error(error)
                setGeocodeError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCoords()
    }, [address, property.location])

    if (isLoading) {
        return <Spinner isOverride size={"10vw"} />
    }

    if (geocodeError) {
        return <h3>No location data found</h3>
    }

    return (
        <ClientOnlyMap lat={lat} lng={lng} popupDescription={
            <div className=' text-center'>
                <p>{property.name}</p>
                <p>{address}</p>
            </div>
        } />
    )
}

export default PropertyMap;
