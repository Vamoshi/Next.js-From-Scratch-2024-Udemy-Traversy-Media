'use client'
import React from 'react'
import DefaultImage from './DefaultImage'
import { Gallery, Item } from "react-photoswipe-gallery"
type Props = {
    images: string[]
}

const PropertyImages = ({ images }: Props) => {

    return (
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">
                    {
                        images.length === 1 ?
                            <Item
                                original={images[0]}
                                thumbnail={images[0]}
                                width={1000}
                                height={600}
                            >
                                {
                                    ({ ref, open }) =>
                                        <div ref={ref}>
                                            <DefaultImage src={images[0]}
                                                onClick={open}
                                                className=' object-cover h-[400px] mx-auto rounded-xl hover:cursor-pointer'
                                                priority={true}
                                            />
                                        </div>
                                }
                            </Item>
                            :
                            <div className='grid grid-cols-2 gap-4'>
                                {
                                    images.map((image, index) =>
                                        <Item
                                            original={image}
                                            thumbnail={image}
                                            width={1000}
                                            height={600}
                                            key={index}
                                        >
                                            {
                                                ({ ref, open }) =>
                                                    <div className={`${images.length === 3 && index === 2 ? ' col-span-2' : ' col-span-1'}`} ref={ref}>
                                                        <DefaultImage src={image}
                                                            width={1800}
                                                            height={400}
                                                            className=' object-cover h-[400px] mx-auto rounded-xl w-full hover:cursor-pointer'
                                                            priority={true}
                                                            sizes=''
                                                            onClick={open}
                                                        />
                                                    </div>
                                            }
                                        </Item>
                                    )
                                }
                            </div>

                    }
                </div>
            </section>
        </Gallery>
    )
}

export default PropertyImages