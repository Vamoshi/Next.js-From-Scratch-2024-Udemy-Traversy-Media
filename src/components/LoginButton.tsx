import { ClientSafeProvider, signIn } from 'next-auth/react'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

type Props = {
    className?: string,
    providers: Record<string, ClientSafeProvider> | null
}

const LoginButton = ({ className, providers }: Props) => {

    return <>
        {
            providers &&
            Object.values(providers).map((provider) =>
                provider.id == "google" &&
                <button
                    key={provider.id}
                    className={className}
                    onClick={() => signIn(provider.id)}
                >
                    <FaGoogle className="text-white mr-2" />
                    <span>Login or Register</span>
                </button>
            )
        }

    </>
}

export default LoginButton