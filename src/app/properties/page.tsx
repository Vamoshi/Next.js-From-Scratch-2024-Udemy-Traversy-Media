import React from 'react'
import { Pagination, PropertyCard } from '@/components'
import Property from '@/models/Property'
import connectDB from '@/config/database'
import { PropertyDocument } from '@/models'

type Props = {
    searchParams: {
        page: string | number,
        pageSize: string | number
    }
}

// [...id] to make it a catch all /id/foo/bar will route to /id
// const PropertyPage = ({ params {this is the params}, searchParams {any search?} }: Props) => {
const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 10 } }: Props) => {


    await connectDB()

    // Calculate how many properties are skipped
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string)

    const total = await Property.countDocuments({})
    const showPagination = total > parseInt(pageSize as string)

    // lean returns query results as plains js objects instead of mongoose doc
    // can only be used if read -only
    const properties = await Property.find({}).skip(skip).limit(parseInt(pageSize as string))

    return (
        <section className='px-4 py6 mt-6'>
            <div className="container-xl lg:container m-auto px-4 py6">
                {
                    properties.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property, key) => <PropertyCard key={key} property={property as PropertyDocument} />)}
                        </div>
                        :
                        <h1 className="text-center text-2xl font-bold mt-10">
                            No Properties Found
                        </h1>
                }
                {
                    showPagination &&
                    <Pagination page={parseInt(page as string)} pageSize={parseInt(pageSize as string)} totalItems={total} />
                }
            </div>
        </section>
    )
}
export default PropertiesPage
