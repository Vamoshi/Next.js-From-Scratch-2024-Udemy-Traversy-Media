"use client"

import bookmarkProperty from '@/app/actions/bookmarkProperty'
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus'
import { PropertyDocument } from '@/models'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast, ToastContent } from 'react-toastify'

type Props = {
    property: PropertyDocument
}

const BookmarkButton = ({ property }: Props) => {


    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    const { data: session } = useSession()
    const userId = session?.user.id


    useEffect(() => {
        if (userId) {
            checkBookmarkStatus(property._id).then(res => {
                if (res.error) toast.error(res.error)
                if (res.isBookmarked) setIsBookmarked(res.isBookmarked)
            })
        }

        setIsLoading(false)
    }, [property._id, userId])

    const handleClick = async () => {
        if (!userId) {
            toast.error("You need to be signed in to bookmark a listing")
            return
        }

        if (userId === property.owner.toString()) {
            toast.error("You cannot bookmark your own property")
            return
        }

        await bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error as ToastContent<unknown>)
            setIsBookmarked(res.isBookmarked as boolean)
            toast.success(res.message as ToastContent<unknown>)
        })
    }

    if (isLoading) {
        <p className=' text-center'>Loading...</p>
    }

    return !isLoading && isBookmarked ?
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}
        >
            <FaBookmark className='mr-2' />Remove Bookmark
        </button>
        :
        < button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}
        >
            <FaBookmark className='mr-2' />Bookmark Property
        </button >

}

export default BookmarkButton