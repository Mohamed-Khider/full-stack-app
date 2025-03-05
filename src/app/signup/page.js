'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (<div className="flex items-center h-screen justify-center">
        <div className="flex-1 flex flex-col  h-dvh items-center justify-center">
            <h1 className="text-4xl font-bold m-3">Sign up</h1>
            <form onSubmit={handleForm} className="flex flex-col gap-4">
                <label htmlFor="email">
                    <p className="font-bold">Email</p>
                    <input className="p-2 bg-gray-300 rounded"  onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p className="font-bold">Password</p>
                    <input className="p-2 bg-gray-300 rounded" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit" className="rounded cursor-pointer bg-amber-300  p-2">Sign up</button>
                <p className="mt-3 text-center"> have an account? <a href="/signin" className="underline text-blue-600">Sign in</a></p>
            </form>
        </div>

    </div>);
}

export default Page;