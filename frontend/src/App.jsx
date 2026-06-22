import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CompanyHome from "./pages/Company Pages/CompanyHome";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* student */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* company */}
        <Route path="/company/home" element={<CompanyHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
