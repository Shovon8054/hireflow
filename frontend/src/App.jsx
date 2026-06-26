import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

// =================================================================
// COMPANY
// =================================================================
import CompanyHome from "./pages/Company Pages/CompanyHome";
import CompanyProfile from "./pages/Company Pages/CompanyProfile";
import UpdateCompanyProfile from "./pages/Company Pages/UpdateCompanyProfile";
// --------job section
import PostJob from "./pages/Company Pages/Job Section/PostJob";
// -------dashboard section
import Dashboard from "./pages/Company Pages/Dashboard-Section/Dashboard";
// =============================================================================


// ========================================================================
// STUDENT
// ========================================================================
import StudentProfile from "./pages/StudentProfile";
import ShowStudentProfile from "./pages/ShowStudentProfile";
import Job from "./pages/student-pages/Job";

// =============================================================================



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* --------------------------student------------------------------ */}
        <Route path="/home" element={<Home />} />
        <Route path="/student/show-profile" element={<ShowStudentProfile />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/job" element={<Job/>} />

        {/* ---------------------------company------------------------------- */}
        <Route path="/company/home" element={<CompanyHome />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/profile/update" element={<UpdateCompanyProfile />} />

        <Route path="/company/post-job" element={<PostJob />} />
        <Route path="/company/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
