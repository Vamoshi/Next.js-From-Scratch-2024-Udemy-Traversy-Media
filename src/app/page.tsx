import { FeaturedProperties, Hero, InfoBoxes } from '@/components'
import { HomeProperties } from '@/components'
import React from 'react'

const HomePage = () => {
    return <>
        <Hero />
        <InfoBoxes />
        <FeaturedProperties />
        <HomeProperties />
    </>
}

export default HomePage