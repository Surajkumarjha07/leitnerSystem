import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type cardType = {
    id: number,
    question: string,
    answer: string,
}

export default function Card({ id, question, answer }: cardType) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [cardId, setCardId] = useState<string | null | undefined>("");
    const [cookie, setCookie] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedCookie = Cookies.get("authToken");

        if (fetchedCookie) {
            setCookie(fetchedCookie);
        }

    }, [])

    const deleteCard = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        if (target) {
            const targetId = target.parentElement?.parentElement?.children[0].textContent;
            setCardId(targetId);
            if (cardId) {
                axios.delete(`http://localhost:4000/flashcards/${parseInt(cardId!)}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${cookie}`
                    }
                })
                    .then(() => {
                        alert("Card has been deleted!");
                        window.location.reload();
                    })
                    .catch(() => {
                        alert("Some error occured while deleting!");
                    })
            }
        }
    }

    const updateCard = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        if (target) {
            const targetId = target.parentElement?.parentElement?.children[0].textContent;
            setCardId(targetId);
            navigate(`/update-card/${targetId}`);
        }
    }

    const leitnerSystem = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const text = target.innerHTML;        
        const cardElement = target.closest(".card-container");
        const targetId = cardElement?.querySelector(".id-text")?.textContent;
        setCardId(targetId);

        if (text && cardId) {
            axios.put("http://localhost:4000/leitnerSystem", {
                text, cardId
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            })
            .then((response) => {
                response.data.right ?
                alert("You are progressing!") : alert("You need more attention!");
            })
            .catch(() => {
                alert("Some error occured!");
            })
        }
    }

    return (
        <>
            <div className="text-black bg-gray-100 px-4 py-4 rounded-lg shadow-md shadow-gray-400 card-container">
                <div className="flex justify-between items-center">
                    <p className="id-text text-gray-800 text-sm font-medium">
                        {id}
                    </p>

                    <div className="flex justify-center items-center gap-4">
                        <button className="text-red-500 cursor-pointer" onClick={deleteCard}>
                            Delete
                        </button>

                        <button className="text-blue-500 cursor-pointer" onClick={updateCard}>
                            Update
                        </button>
                    </div>
                </div>

                <div className="my-4">
                    <p className="text-gray-800 text-2xl font-medium my-1">
                        {question}
                    </p>

                    <p className="text-gray-700 text-lg font-normal">
                        ans: {
                            showAnswer ?
                                answer : "-------"
                        }
                    </p>
                </div>

                <div className="flex justify-center items-center my-4">
                    <button className="bg-blue-500 w-fit cursor-pointer text-white py-1 px-4 text-xs rounded-md" onClick={() => setShowAnswer(!showAnswer)}>
                        {
                            !showAnswer ?
                                "Show answer" : "Hide answer"
                        }
                    </button>
                </div>

                <div className="flex justify-between items-center gap-8">
                    <button className="bg-green-500 w-fit cursor-pointer text-white py-1 px-4 text-sm rounded-md" onClick={leitnerSystem}>
                        Got it right
                    </button>

                    <button className="bg-red-500 w-fit cursor-pointer text-white py-1 px-4 text-sm rounded-md" onClick={leitnerSystem}>
                        Got it wrong
                    </button>
                </div>
            </div>
        </>
    )
}
