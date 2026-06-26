import { Link } from "react-router-dom";

const JobPostCard = ({ job }) => {
    return (
<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
  
  {/* Header Section */}
  <div className="p-6 pb-4 border-b border-gray-100">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-1">
          {job.title}
        </h2>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.location || 'Location not specified'}</span>
        </div>
      </div>
      {job.is_featured && (
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
          Featured
        </span>
      )}
    </div>
  </div>

  {/* Body Section */}
  <div className="p-6 space-y-4">
    {/* Skills Section */}
    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
      <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Skills Required
      </p>
      <div className="flex flex-wrap gap-1.5">
        {job.skills ? (
          job.skills.split(',').map((skill, index) => (
            <span 
              key={index}
              className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium"
            >
              {skill.trim()}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No skills specified</span>
        )}
      </div>
    </div>

    {/* Salary and Deadline Grid */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-green-50 rounded-lg p-3 border border-green-100">
        <div className="flex items-center gap-1.5 text-green-700 text-sm font-semibold mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1V7m0 1v1" />
          </svg>
          Salary Range
        </div>
        <p className="text-gray-800 font-medium text-sm">
          {job.salary_min && job.salary_max ? (
            `$${job.salary_min} - $${job.salary_max}`
          ) : job.salary_min ? (
            `From $${job.salary_min}`
          ) : job.salary_max ? (
            `Up to $${job.salary_max}`
          ) : (
            'Competitive'
          )}
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
        <div className="flex items-center gap-1.5 text-purple-700 text-sm font-semibold mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Deadline
        </div>
        <p className="text-gray-800 font-medium text-sm">
          {job.deadline ? (
            new Date(job.deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          ) : (
            'Not specified'
          )}
        </p>
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <div className="px-6 pb-6 pt-2">
    <Link
      to={`/student/jobs/${job.id}`}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
    >
      <span>View Details</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  </div>
</div>
    );
};

export default JobPostCard;