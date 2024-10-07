import { PropertyCard, PropertySearchForm } from '@/components'
import connectDB from '@/config/database'
import { IProperty, Property, PropertyDocument } from '@/models'
import convertToSerializable from '@/utils/convertToSerializable'
import { FilterQuery } from 'mongoose'
import Link from 'next/link'
import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

type Props = {
    searchParams: {
        location: string,
        propertyType: string,
    }
}

const SearchResultsPage = async ({ searchParams: { location, propertyType } }: Props) => {

    await connectDB()

    const locationPattern = new RegExp(location, 'i')
    const query: FilterQuery<PropertyDocument> = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ]
    }

    if (propertyType && propertyType !== "All") {
        const typePattern = new RegExp(propertyType, 'i')
        query.type = typePattern
    }

    const propertiesQueryResults = await Property.find(query).lean()
    const properties: IProperty[] = propertiesQueryResults.map((property) => convertToSerializable(property))


    console.log('====================================');
    console.log(properties);
    console.log('====================================');

    return (
        <>
            <section className=' bg-blue-700 py-4'>
                <div className=" max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <section className=' px-4 py-6'>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href={'/properties'} className='flex items-center text-blue-500 hover:underline mb-3'>
                        <FaArrowAltCircleLeft className=' mr-2 mb-1' /> Back to properties
                    </Link>
                    <h1 className=' text-2xl mb-4'>Search Results</h1>
                    {
                        properties.length === 0 ? <p>No Search Results</p>
                            :
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {
                                    properties.map(property =>
                                        <PropertyCard key={property._id} property={property} />
                                    )
                                }
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default SearchResultsPage