import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./componets/SignUp/ParentSignUp/SignUp";
import SignIn from "./componets/SignIn/SignIn";
import VetSignUp from "./componets/SignUp/VetSignUp/VetSignUp";
import Home from "./Pages/Home";
import "./App.css";
import PetInfo from "./componets/PetInfo/PetInfo";
import ParetProfile from "./componets/Profile/ParentProfile/ParetProfile";
import VetProfile from "./componets/Profile/VetProfile/VetProfile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup">
        <Route path="petParent" element={<SignUp />} />
        <Route path="vet" element={<VetSignUp />} />
      </Route>
      <Route path="/petinfo" element={<PetInfo />} />
      <Route path="/me/profile" element={<ParetProfile />} />
      <Route path="/vet/profile" element={<VetProfile />} />
    </Routes>
  );
}

export default App;
