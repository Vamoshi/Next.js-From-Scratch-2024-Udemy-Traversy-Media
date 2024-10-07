import { MessageCard } from '@/components'
import connectDB from '@/config/database'
import { IMessage, MessageDocument } from '@/models/IMessage'
import Message from '@/models/Message'
import convertToSerializable from '@/utils/convertToSerializable'
import { getSessionUser } from '@/utils/getSessionUser'
import React from 'react'

const MessagesPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()


    const readMessages = await Message.find({ recipient: sessionUser?.id, read: true }).sort({ createdAt: -1 }).populate('sender', 'username').populate('property', 'name').lean() as MessageDocument[]
    const unreadMessages = await Message.find({ recipient: sessionUser?.id, read: false }).sort({ createdAt: -1 }).populate('sender', 'username').populate('property', 'name').lean() as MessageDocument[]


    const messages: IMessage[] = [...readMessages, ...unreadMessages].map((e: MessageDocument): IMessage => ({
        ...e,
        _id: convertToSerializable(e._id),
        sender: convertToSerializable(e.sender),
        property: convertToSerializable(e.property),
        recipient: convertToSerializable(e.recipient)
    }) as IMessage)

    return (
        <section className=' bg-blue-50'>
            <div className=' container m-auto py-24 max-w-6xl'>
                <div className=' bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    <div className="space-y-4">
                        {
                            messages.length === 0 ? <p>You have no messages</p> :
                                messages.map((message) => <MessageCard key={message._id} message={message} />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MessagesPage