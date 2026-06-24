import CompanyNavbar from "../../components/CompanyNavbar"
import { useNavigate } from "react-router-dom";



const CompanyProfile = () => {

        const navigate = useNavigate();


  return (
    <div>
        <CompanyNavbar/>
      <h3>company profile bla bla vla........</h3>
      <button onClick={() => navigate("/company/profile/update")}>
         Edit Profile
      </button>
    </div>
  )
}

export default CompanyProfile
