import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LogInUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:4000/logIn", {
            email,
            password
        },
        {
            withCredentials: true
        }
    )
            .then((response: any) => {
                console.log(response);
                Cookies.set("authToken", response.token);
                alert("You are logged in!");
                setEmail("");
                setPassword("");
            })
            .catch(() => {
                alert("Some error occured!");
            })
    }

    return (
        <>
            <section className='w-screen h-screen relative flex justify-center items-center'>
                <form className="w-auto bg-white px-14 py-8 flex flex-col justify-center rounded-md shadow-md" method="post" onSubmit={LogInUser}>
                    <div className='flex justify-start items-center gap-1 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text'>
                        <p className='font-medium text-4xl text-transparent'>
                            Flash-Leiter
                        </p>
                    </div>

                    <p className='text-2xl text-black font-semibold my-4'> Sign In </p>

                    <input type="email" name="email" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" autoFocus placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <br />

                    <input type="password" name="password" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                    <p className="text-gray-800 font-medium max-md:text-xs my-6">
                        Don&apos;t have an account?
                        <Link to={'/sign-up'}>
                            <span className="text-blue-600 cursor-pointer ml-2">
                                Create one!
                            </span>
                        </Link>
                    </p>

                    <input type="submit" value="Sign In" className="bg-blue-500 w-32 cursor-pointer text-white py-2 rounded-md self-end" />
                </form>
            </section>
        </>
    )
}
