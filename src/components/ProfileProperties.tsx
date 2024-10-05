"use client"

import { PropertyDocument } from '@/models'
import React, { useState } from 'react'
import DefaultImage from './DefaultImage'
import Link from 'next/link'
import deleteProperty from '@/app/actions/deleteProperty'
import { toast } from "react-toastify"

type Props = {
    properties: PropertyDocument[]
}

const ProfileProperties = ({ properties: initialProperties }: Props) => {
    const [properties, setProperties] = useState(initialProperties)

    const handleDeleteProperty = async (propertyId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this property?")
        if (!confirmed) {
            return
        }
        const updatedProperties = properties.filter(property => property._id !== propertyId)
        setProperties(updatedProperties)
        await deleteProperty(propertyId)

        toast.success("Property Deleted Successfully")
    }

    return properties.map((property, index) =>
        <div className="mb-10" key={index}>
            <Link href={`/properties/${property._id}`}>
                <DefaultImage
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property 1"
                />
            </Link>
            <div className="mt-2">
                <p className="text-lg font-semibold">{property.name}</p>
                <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state}</p>
            </div>
            <div className="mt-2">
                <Link
                    href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                >
                    Edit
                </Link>
                <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                    onClick={() => handleDeleteProperty(property._id as string)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProfileProperties