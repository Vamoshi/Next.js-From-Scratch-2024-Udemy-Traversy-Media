import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import Property from '@/models/Property'
import connectDB from '@/config/database'
import { IProperty } from '@/models/IProperty'
// [...id] to make it a catch all /id/foo/bar will route to /id

// const PropertyPage = ({ params {this is the params}, searchParams {any search?} }: Props) => {
const PropertiesPage = async () => {
    // References
    // const router = useRouter()
    // const params = useParams()
    // const searchParams = useSearchParams()
    // const pathName = usePathname()

    await connectDB()
    // lean returns query results as plains js objects instead of mongoose doc
    // can only be used if read only
    const properties = await Property.find({}).lean()

    return (
        <section className='px-4 py6'>
            <div className="container-xl lg:container m-auto px-4 py6">
                {
                    properties.length === 0 ?
                        <p>No Properties Found</p>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {
                                properties.map((property, key) =>
                                    <PropertyCard key={key} property={property as IProperty} />
                                )
                            }
                        </div>
                }
            </div>
        </section>
    )
}

export default PropertiesPage