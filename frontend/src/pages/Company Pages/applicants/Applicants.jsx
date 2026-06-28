import { useEffect, useState } from "react";
import api from "../../../services/api";
import CompanyNavbar from "../../../components/CompanyNavbar";

const Applicants = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const res = await api.get("/applicants");
            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatusChange = async (applicationId, status) => {

        try {

            await api.put(`/applicants/${applicationId}`, {
                status,
            });

            setJobs((prevJobs) =>
                prevJobs.map((job) => ({
                    ...job,
                    applicants: job.applicants.map((applicant) =>
                        applicant.id === applicationId
                            ? { ...applicant, status }
                            : applicant
                    ),
                }))
            );

        } catch (err) {
            console.log(err);
            alert("Failed to update status");
        }

    };

    return (
        <div className="min-h-screen bg-gray-100">

            <CompanyNavbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-3xl font-bold mb-8">
                    Applicants
                </h1>

                {jobs.length === 0 ? (

                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        No jobs found.
                    </div>

                ) : (

                    jobs.map((job) => (

                        <div
                            key={job.id}
                            className="bg-white rounded-xl shadow mb-10"
                        >

                            <div className="border-b px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    {job.title}
                                </h2>

                            </div>

                            {job.applicants.length === 0 ? (

                                <div className="p-6 text-gray-500">
                                    No applicants yet.
                                </div>

                            ) : (

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <thead className="bg-gray-50">

                                            <tr>

                                                <th className="px-6 py-4 text-left">
                                                    Name
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Email
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Status
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Resume
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {job.applicants.map((applicant) => (

                                                <tr
                                                    key={applicant.id}
                                                    className="border-t hover:bg-gray-50"
                                                >

                                                    <td className="px-6 py-4">
                                                        {applicant.name}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {applicant.email}
                                                    </td>

                                                    <td className="px-6 py-4">

                                                        <select
                                                            value={applicant.status}
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    applicant.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="border rounded-lg px-3 py-2"
                                                        >

                                                            <option value="pending">
                                                                Pending
                                                            </option>

                                                            <option value="shortlisted">
                                                                Shortlisted
                                                            </option>

                                                            <option value="interview">
                                                                Interview
                                                            </option>

                                                            <option value="rejected">
                                                                Rejected
                                                            </option>

                                                        </select>

                                                    </td>

                                                    <td className="px-6 py-4">

                                                        <a
                                                            href={`http://localhost:8080/api/applicants/resume/${applicant.resume_id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Download Resume
                                                        </a>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default Applicants;