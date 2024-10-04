import React from 'react'
import DefaultImage from './DefaultImage'

type Props = {
    image: string
}

const PropertyHeaderImage = ({ image }: Props) => {
    return (
        <section>
            <div className="container-xl m-auto">
                <div className="grid grid-cols-1">
                    <DefaultImage
                        src={image}
                        className="object-cover h-[400px] w-full"
                        width="1800"
                    />
                </div>
            </div>
        </section>
    )
}

export default PropertyHeaderImage