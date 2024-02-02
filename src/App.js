import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Notifications } from 'react-push-notification';

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"


function App() {
  return (
    <BrowserRouter>
     <Notifications />

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/" element={<LogIn />} />
         <Route path="/Signup" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
