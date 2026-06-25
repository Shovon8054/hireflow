import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UpdateCompanyProfile = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        company_name: "",
        industry: "",
        description: "",
        website: "",
        logo: null
    });


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await api.get("/company-profile");
                if (res.data) {

                    setForm({
                        company_name: res.data.company_name || "",
                        industry: res.data.industry || "",
                        description: res.data.description || "",
                        website: res.data.website || "",
                        logo: res.data.logo||null
                    });

                }

            }

            catch (err) {
                console.log(err);
            }

        };

        fetchProfile();

    }, []);



    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleLogo = (e) => {

        setForm({

            ...form,
            logo: e.target.files[0]

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const data = new FormData();

            data.append("company_name", form.company_name);
            data.append("industry", form.industry);
            data.append("description", form.description);
            data.append("website", form.website);

            if(form.logo){
                data.append("logo", form.logo);
            }


            await api.post(

                "/company-profile",

                data

            );


            alert("Profile Updated");

            navigate("/company/profile");

        }

        catch(err){

            console.log(err);

            alert("Something went wrong");

        }

    };


    return (

        <div className="max-w-3xl mx-auto mt-10">

            <div className="bg-white p-8 rounded-xl shadow">


                <div className="flex justify-between mb-8">

                    <h1 className="text-3xl font-bold">
                        Update Company Profile
                    </h1>


                    <button

                        onClick={() => navigate(-1)}

                        className="bg-gray-200 px-4 py-2 rounded-lg"

                    >

                        Back

                    </button>

                </div>



                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    <input

                        type="text"

                        name="company_name"

                        placeholder="Company Name"

                        value={form.company_name}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />



                    <input

                        type="text"

                        name="industry"

                        placeholder="Industry"

                        value={form.industry}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />



                    <textarea

                        rows="5"

                        name="description"

                        placeholder="Description"

                        value={form.description}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />




                    <input

                        type="text"

                        name="website"

                        placeholder="Website"

                        value={form.website}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />



                    <input

                        type="file"

                        onChange={handleLogo}

                        className="w-full"

                    />




                    <button

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

                    >

                        Save Profile

                    </button>


                </form>


            </div>

        </div>
    );
};

export default UpdateCompanyProfile;