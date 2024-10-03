import { PropertyDetails, PropertyHeaderImage } from '@/components'
import connectDB from '@/config/database'
import { IProperty } from '@/models/IProperty'
import Property from '@/models/Property'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
// [...id] to make it Link catch all /id/foo/bar will route to /id

type Props = {
    params: {
        id: string
    }
}

// const PropertyPage = ({ params {this is the params}, searchParams {any search?} }: Props) => {
const PropertyPage = async ({ params }: Props) => {
    // References
    // const router = useRouter()
    // const params = useParams()
    // const searchParams = useSearchParams()
    // const pathName = usePathname()

    await connectDB()
    const property = await Property.findById(params.id).lean() as IProperty

    return (
        <>
            <PropertyHeaderImage image={property.images && property.images[0] || ""} />
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className='mr-2' /> Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <PropertyDetails property={property} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyPage