"use client"

import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const override = {
    display: 'block',
    margin: '100px auto'
}

type Props = {
    size?: number | string
    isOverride?: boolean
}

const Spinner = ({ size, isOverride }: Props) => {
    return (
        <ClipLoader color="#3b82f6" cssOverride={isOverride ? override : {}} size={size || "5vh"} aria-label='spinner' />
    )
}

export default Spinner