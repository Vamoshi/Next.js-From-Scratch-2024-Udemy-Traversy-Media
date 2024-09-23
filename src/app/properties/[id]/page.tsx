"use client"
import React from 'react'
// [...id] to make it a catch all /id/foo/bar will route to /id

type Props = {
    params: {
        id: string
    }
}

// const PropertyPage = ({ params {this is the params}, searchParams {any search?} }: Props) => {
const PropertyPage = ({ params }: Props) => {
    // References
    // const router = useRouter()
    // const params = useParams()
    // const searchParams = useSearchParams()
    // const pathName = usePathname()

    return (
        <div>{params.id}</div>
    )
}

export default PropertyPage