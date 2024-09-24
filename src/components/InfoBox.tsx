import React from 'react'


type Props = {
    children: string,
    heading: string,
    bgColor?: string,
    textColor?: string,
    buttonInfo: {
        text: string,
        link: string,
        bgColor?: string
    }
}

const InfoBox = ({ heading, children, bgColor = "bg-gray-100", textColor = "text-gray-800", buttonInfo }: Props) => {
    return (
        <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <a
                href={buttonInfo.link}
                className={`${buttonInfo.bgColor || "bg-gray-800"} inline-block  text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
            >
                {buttonInfo.text}
            </a>
        </div>
    )
}

export default InfoBox