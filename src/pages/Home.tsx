import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Card from "../components/card";

export default function Home() {
    const [flashCards, setFlashCards] = useState<any[]>([]);
    const [cookie, setCookie] = useState("");

    useEffect(() => {
        const fetchedCookie = Cookies.get("authToken");

        if (fetchedCookie) {
            setCookie(fetchedCookie);
        }

    }, [])


    useEffect(() => {
        if (cookie) {
            axios.get("http://localhost:4000/flashcards", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            })
                .then((response: any) => {
                    setFlashCards([...flashCards, ...response.data.allCards])
                })
                .catch(() => {
                    console.log("error in fetching cards");
                })
        }
    }, [cookie])

    return (
        <>
            <section className="relative w-screen h-fit">
                {
                    !cookie ?
                        <div className="flex flex-col justify-center items-center gap-10 h-screen">
                            <p className="text-4xl font-bold text-gray-700">
                                Please log in to see your Flash Cards!
                            </p>
                            <Link to={"/"}>
                                <button className="bg-blue-500 w-fit cursor-pointer text-white py-2 px-8 rounded-md">
                                    Log In
                                </button>
                            </Link>
                        </div>
                        :
                        flashCards.length > 0 &&
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 ml-10 mt-6"> Your Cards </h1>
                            <div className="flex justify-start items-start gap-10 w-full h-full flex-wrap p-10">
                                {
                                    flashCards.map((card, index) => (
                                        card.daysLeftToReview == 0 ?
                                            <Card key={index} id={card.id} question={card.question} answer={card.answer} /> : ""
                                    ))
                                }
                            </div>
                        </>
                }
                <p className="text-center text-xl font-bold text-gray-900"> You have {flashCards.length} cards due today </p>
            </section>
        </>
    )
}
