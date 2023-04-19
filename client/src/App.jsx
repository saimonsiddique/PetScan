import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Error from "./Pages/Error";
import SignUp from "./componets/SignUp/ParentSignUp/SignUp";
import SignIn from "./componets/SignIn/SignIn";
import VetSignUp from "./componets/SignUp/VetSignUp/VetSignUp";
import Home from "./Pages/Home";
import AddPet from "./componets/AddPet/AddPet";
import NewsFeed from "./componets/NewsFeed/NewsFeed";
import Dashboard from "./Pages/Dashboard";

// Test
import Meet from "./Pages/Meet";
import Success from "./componets/Success/Success";
import VetSteps from "./componets/VetSteps/VetSteps";

export const ImageContext = createContext(null);

function App() {
  const [image, setImage] = useState("");

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup">
          <Route path="petParent" element={<SignUp />} />
          <Route path="vet" element={<VetSignUp />} />
        </Route>
        <Route path="/vet/details" element={<VetSteps />} />
        <Route path="/pet">
          <Route path="add" element={<AddPet />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<NewsFeed />} />
        <Route path="/book-appointment" element={<Meet />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </ImageContext.Provider>
  );
}

export default App;
