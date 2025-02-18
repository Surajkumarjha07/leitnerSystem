import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/Home";
import CreateCard from "./pages/createCard";
import UpdateCard from "./pages/updateCard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="create-card" element={<CreateCard/>}/>
        <Route path="/update-card/:cardId" element={<UpdateCard/>}/>
      </Routes>
    </>
  )
}
