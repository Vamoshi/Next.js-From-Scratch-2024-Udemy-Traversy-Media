import React from 'react'
import DefaultImage from './DefaultImage'

type Props = {
    images: string[]
}

const PropertyImages = ({ images }: Props) => {

    return (
        <section className="bg-blue-50 p-4">
            <div className="container mx-auto">
                {
                    images.length === 1 ?
                        <DefaultImage src={images[0]}
                            className=' object-cover h-[400px] mx-auto rounded-xl'
                            priority={true}
                        />
                        :
                        <div className='grid grid-cols-2 gap-4'>
                            {
                                images.map((image, index) =>
                                    <div key={index} className={`${images.length === 3 && index === 2 ? ' col-span-2' : ' col-span-1'}`}>
                                        <DefaultImage src={image}
                                            width={1800}
                                            height={400}
                                            className=' object-cover h-[400px] mx-auto rounded-xl w-full'
                                            priority={true}
                                            sizes=''
                                        />
                                    </div>
                                )
                            }
                        </div>

                }
            </div>
        </section>
    )
}

export default PropertyImages