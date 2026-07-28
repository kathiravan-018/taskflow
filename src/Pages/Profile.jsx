import {
  FaUserCircle,
  FaEnvelope,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClipboardList,
  FaCheckCircle,
  FaFire,
  FaEdit,
} from "react-icons/fa";
import { useContext, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../Context/AuthContext";
import { BoardContext } from "../Context/BoardContext";

function Profile() {
  const { user } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    totalTasks,
    completedTasks,
    highPriorityTasks,
  } = useContext(BoardContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-xl text-white p-8 mb-8">

        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center gap-6">

            <FaUserCircle className="text-8xl" />

            <div>
              <h1 className="text-4xl font-bold">
                {user?.name}
              </h1>

              <p className="text-blue-100 mt-3 ms-1 text-lg">
                Welcome 
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-6 md:mt-0 flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            <FaEdit />
            Edit Profile
          </button>

        </div>

      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 rounded-2xl p-5 hover:shadow-lg transition">

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-blue-600 text-2xl" />

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold break-all">
                  {user?.email}
                </h3>
              </div>

            </div>

          </div>

          <div className="bg-green-100 rounded-2xl p-5 hover:shadow-lg transition">

            <div className="flex items-center gap-3">

              <FaGraduationCap className="text-green-600 text-2xl" />

              <div>
                <p className="text-sm text-gray-500">
                  College
                </p>

                <h3 className="font-semibold">
                  {user?.college}
                </h3>
              </div>

            </div>

          </div>

          <div className="bg-purple-100 rounded-2xl p-5 hover:shadow-lg transition">

            <div className="flex items-center gap-3">

              <FaMapMarkerAlt className="text-purple-600 text-2xl" />

              <div>
                <p className="text-sm text-gray-500">
                  City
                </p>

                <h3 className="font-semibold">
                  {user?.city}
                </h3>
              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        {/* Productivity Overview */}

<div className="mt-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">

  <div className="flex flex-col lg:flex-row items-center justify-between">

    {/* Left */}
    <div>
      <h2 className="text-3xl font-bold">
        Productivity Overview
      </h2>

      <p className="text-blue-100 mt-2">
        Keep track of your progress and stay productive.
      </p>

      <div className="mt-8 flex gap-10">

        <div>
          <h1 className="text-5xl font-bold">
            {totalTasks}
          </h1>
          <p className="text-blue-100 mt-1">
            Total Tasks
          </p>
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {completedTasks}
          </h1>
          <p className="text-blue-100 mt-1">
            Completed
          </p>
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {highPriorityTasks}
          </h1>
          <p className="text-blue-100 mt-1">
            High Priority
          </p>
        </div>

      </div>
    </div>

    {/* Right */}

    <div className="mt-10 lg:mt-0 flex flex-col items-center">

      <div className="relative w-44 h-44 rounded-full bg-white/10 flex items-center justify-center">

        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="10"
          />

          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={314}
            strokeDashoffset={
              314 -
              (314 *
                (totalTasks === 0
                  ? 0
                  : completedTasks / totalTasks))
            }
          />
        </svg>

        <div className="text-center z-10">
          <h1 className="text-4xl font-bold">
            {totalTasks === 0
              ? 0
              : Math.round((completedTasks / totalTasks) * 100)}
            %
          </h1>

          <p className="text-sm text-blue-100">
            Complete
          </p>
        </div>

      </div>

    </div>

  </div>

</div>

        
      </div>

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
        />
      )}

    </div>
  );
}

export default Profile;