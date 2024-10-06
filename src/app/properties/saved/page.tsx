import { PropertyCard } from '@/components'
import { PropertyDocument, User } from '@/models'
import { getSessionUser } from '@/utils/getSessionUser'
import React from 'react'

const SavedPropertiesPage = async () => {
    const userSession = await getSessionUser()

    const { bookmarks } = await User.findById(userSession?.id).populate("bookmarks")

    return (
        <section className=' px-4 py-6'>
            <div className=' container lg:container m-auto px-4 py-6'>
                <h1 className="text-2xl mb-4"> Saved Properties </h1>
                {
                    bookmarks.length === 0 ? <p>No Saved Properties</p>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {
                                bookmarks.map((property: PropertyDocument) =>
                                    <PropertyCard key={property._id.toString()} property={property} />
                                )
                            }
                        </div>
                }
            </div>
        </section>
    )
}

export default SavedPropertiesPage