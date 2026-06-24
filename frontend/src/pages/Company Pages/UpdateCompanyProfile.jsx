import { useNavigate } from "react-router-dom";

const UpdateCompanyProfile = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h3>heluu guyzzzzz</h3>
      <button onClick={() => navigate(-1)}>
         Back
      </button>
    </div>
  )
}

export default UpdateCompanyProfile
