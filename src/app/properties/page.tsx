"use client"
import React from 'react'
import properties from "@/properties.json"
import PropertyCard from '@/components/PropertyCard'
// [...id] to make it a catch all /id/foo/bar will route to /id

// const PropertyPage = ({ params {this is the params}, searchParams {any search?} }: Props) => {
const PropertiesPage = () => {
    // References
    // const router = useRouter()
    // const params = useParams()
    // const searchParams = useSearchParams()
    // const pathName = usePathname()

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
                                    <PropertyCard key={key} property={property} />
                                )
                            }
                        </div>
                }
            </div>
        </section>
    )
}

export default PropertiesPage