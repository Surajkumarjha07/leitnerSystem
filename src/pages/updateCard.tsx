import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function UpdateCard() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [box, setBox] = useState("");
    const [daysLeftToReview, setdaysLeftToReview] = useState<number | null>(null);
    const [cardId, setCardId] = useState("");
    const [cookie, setCookie] = useState("");
    const params = useParams();

    useEffect(() => {
        const fetchedCookie = Cookies.get("authToken");

        if (fetchedCookie) {
            setCookie(fetchedCookie);
        }

        const id = params.cardId;

        if (id) {
            setCardId(id);
        }
    }, [])

    const updateCard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put(`http://localhost:4000/flashcards/${cardId}`, {
            question, answer, box, daysLeftToReview
        },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            })
            .then(() => {
                alert("Card updated!");
                setQuestion("");
                setAnswer("");
                setBox("");
                setdaysLeftToReview(null);
            })
            .catch(() => {
                alert("Some error occured while updating!")
            })
    }

    return (
        <>
            <section className='w-screen h-screen relative flex justify-center items-center'>
                <form className="w-auto bg-white px-14 py-8 flex flex-col justify-center rounded-md shadow-md" method="post" onSubmit={updateCard}>
                    <div className='flex justify-start items-center gap-1 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text'>
                        <p className='font-medium text-2xl text-transparent'>
                            Flash-Leiter
                        </p>
                    </div>

                    <p className='text-2xl text-black font-semibold my-4'> Update card </p>

                    <input type="text" name="question" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" autoFocus placeholder="Change question" onChange={e => setQuestion(e.target.value)} value={question} />
                    <br />

                    <input type="text" name="answer" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Change answer" onChange={e => setAnswer(e.target.value)} value={answer} />
                    <br />

                    <input type="text" name="box" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Change box" onChange={e => setBox(e.target.value)} value={box} />
                    <br />

                    <input type="text" name="daysLeftToReview" className="w-96 py-3 outline-none border-b border-gray-400 focus:border-b-2 focus:border-b-blue-400 text-gray-700 placeholder:text-sm" placeholder="Change days interval" onChange={e => setdaysLeftToReview(parseInt(e.target.value))} value={daysLeftToReview!} />

                    <p className="text-gray-800 font-medium max-md:text-xs my-6">
                        Don&apos;t want to update? go to
                        <Link to={'/Home'}>
                            <span className="text-blue-600 cursor-pointer ml-2">
                                Home
                            </span>
                        </Link>
                    </p>

                    <input type="submit" value="Update" className="bg-blue-500 w-32 cursor-pointer text-white py-2 rounded-md self-end" />
                </form>
            </section>
        </>
    )
}
