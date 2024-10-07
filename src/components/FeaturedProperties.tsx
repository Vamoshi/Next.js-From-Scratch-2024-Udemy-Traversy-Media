import connectDB from '@/config/database'
import { Property, PropertyDocument } from '@/models'
import React from 'react'
import FeaturedPropertiesCard from './FeaturedPropertiesCard'

const FeaturedProperties = async () => {
    await connectDB()

    const properties = await Property.find({ is_featured: true }).lean() as PropertyDocument[]

    return properties.length > 0 && (
        <section className="bg-blue-50 mx-4 my-6 px-4 py-6 pb-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Featured Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        properties.map(property =>
                            <FeaturedPropertiesCard key={property._id.toString()} property={property} />
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedProperties