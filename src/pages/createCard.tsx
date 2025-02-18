import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function CreateCard() {
    const [id, setId] = useState<number>(0);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [box, setBox] = useState("");
    const [daysLeftToReview, setDaysLeftToReview] = useState<number>(0);
    const [cookie, setCookie] = useState("");

    useEffect(() => {
        const fetchedCookie = Cookies.get("authToken");

        if (fetchedCookie) {
            setCookie(fetchedCookie);
        }

    }, [])


    const createCard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:4000/flashcards", {
            id, question, answer, box, daysLeftToReview
        },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
            .then(() => {
                alert("Your card has been created!");
            })
            .catch(() => {
                alert("Some error occured!")
            })
    }

    return (
        <>
            <section className='w-screen h-screen relative flex justify-center items-center'>
                <form className="w-auto bg-white px-14 py-8 flex flex-col justify-center rounded-md shadow-md" method="post" onSubmit={createCard}>
                    <div className='flex justify-start items-center gap-1 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text'>
                        <p className='font-medium text-2xl text-transparent'>
                            Flash-Leiter
                        </p>
                    </div>

                    <p className='text-2xl text-black font-semibold my-4'> Create FlashCard </p>

                    <input type="text" name="text" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" autoFocus placeholder="Enter card id" onChange={e => setId(parseInt(e.target.value))} />
                    <br />

                    <input type="text" name="name" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Enter question" onChange={e => setQuestion(e.target.value)} />
                    <br />

                    <input type="text" name="name" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Enter answer" onChange={e => setAnswer(e.target.value)} />
                    <br />

                    <input type="text" name="name" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Enter default box number " onChange={e => setBox(e.target.value)} />
                    <br />

                    <input type="text" name="name" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Enter days left to review" onChange={e => setDaysLeftToReview(parseInt(e.target.value))} />
                    <br />

                    <p className="text-gray-800 font-medium max-md:text-xs my-6">
                        go to home?
                        <Link to={'/home'}>
                            <span className="text-blue-600 cursor-pointer ml-2">
                                Home
                            </span>
                        </Link>
                    </p>

                    <input type="submit" value="Create Flash Card" className="bg-blue-500 w-fit cursor-pointer text-white py-2 px-4 rounded-md self-end" />
                </form>
            </section>
        </>
    )
}
