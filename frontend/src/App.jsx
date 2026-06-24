import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

// company
import CompanyHome from "./pages/Company Pages/CompanyHome";
import CompanyProfile from "./pages/Company Pages/CompanyProfile";
import UpdateCompanyProfile from "./pages/Company Pages/UpdateCompanyProfile";

// student
import StudentProfile from "./pages/StudentProfile";
import ShowStudentProfile from "./pages/ShowStudentProfile";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* student */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student/show-profile" element={<ShowStudentProfile />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* company */}
        <Route path="/company/home" element={<CompanyHome />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/profile/update" element={<UpdateCompanyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
