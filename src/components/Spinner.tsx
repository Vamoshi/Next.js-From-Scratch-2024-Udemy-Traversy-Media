"use client"

import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const override = {
    display: 'block',
    margin: '100px auto'
}

type Props = {
    size: number | string
}

const Spinner = ({ size }: Props) => {
    return (
        <ClipLoader color="#3b82f6" cssOverride={override} size={size || "5vh"} aria-label='spinner' />
    )
}

export default Spinner