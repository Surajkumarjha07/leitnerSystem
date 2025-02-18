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
            <section className="relative w-screen h-screen">
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
                        flashCards.length > 0 ?
                            <div className="flex flex-col justify-start items-start gap-10 w-full h-full flex-wrap p-10">
                                <h1 className="text-xl font-bold"> Your Cards </h1>
                                {
                                    flashCards.map((card, index) => (
                                        <Card key={index} id={card.id} question={card.question} answer={card.answer} />
                                    ))
                                }
                            </div> :
                            <div className="flex flex-col justify-center items-center gap-10 h-screen">
                                <p className="text-4xl font-bold text-gray-700">
                                    You don't have any cards currently!
                                </p>
                                <Link to={"/create-card"}>
                                    <button className="bg-blue-500 w-fit cursor-pointer text-white py-2 px-8 rounded-md">
                                        Create cards
                                    </button>
                                </Link>
                            </div>
                }
            </section>
        </>
    )
}
