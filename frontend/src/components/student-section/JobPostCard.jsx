import { Link } from "react-router-dom";

const JobPostCard = ({ job }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden group">

    {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight truncate">
                      {job.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1.5">
                      <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-slate-600 truncate">
                          {job.location || "Location not specified"}
                      </span>
                  </div>
              </div>
              
              {/* Job Type Badge */}
              <div className="flex-shrink-0">
                  {job.is_entry_level ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Entry Level
                      </span>
                  ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Experienced
                      </span>
                  )}
              </div>
          </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-5">

          {/* Skills */}
          <div>
              <div className="flex items-center gap-2 mb-2.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Skills Required
                  </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                  {job.skills ? (
                      job.skills.split(",").map((skill, index) => (
                          <span
                              key={index}
                              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors duration-200"
                          >
                              {skill.trim()}
                          </span>
                      ))
                  ) : (
                      <span className="text-sm text-slate-400">
                          No skills specified
                      </span>
                  )}
              </div>
          </div>

          {/* Salary + Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Salary */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-xl p-4 border border-emerald-100/50">
                  <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                          Salary
                      </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                      {job.salary_min && job.salary_max
                          ? `$${job.salary_min} - $${job.salary_max}`
                          : job.salary_min
                          ? `From $${job.salary_min}`
                          : job.salary_max
                          ? `Up to $${job.salary_max}`
                          : "Competitive"}
                  </p>
              </div>

              {/* Deadline */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-4 border border-purple-100/50">
                  <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-medium text-purple-700 uppercase tracking-wider">
                          Deadline
                      </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                      {job.deadline
                          ? new Date(job.deadline).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )
                          : "Not specified"}
                  </p>
              </div>
          </div>

          {/* Job Type - Compact */}
          <div className="flex items-center justify-between bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100">
              <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">
                      Job Type
                  </span>
              </div>
              {job.is_entry_level ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Entry Level
                  </span>
              ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                      Experienced
                  </span>
              )}
          </div>

      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <Link
              to={`/student/jobs/${job.id}`}
              className="
              w-full
              flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition-all
              duration-300
              group-hover:shadow-md
              group-hover:scale-[1.02]
              "
          >
              <span>View Details</span>
              <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
              </svg>
          </Link>
      </div>

  </div>
    );
};

export default JobPostCard;