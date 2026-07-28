import {
  FaColumns,
  FaTasks,
  FaArrowsAlt,
  FaUserEdit,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";

const features = [
  {
    icon: <FaColumns className="text-3xl text-blue-600" />,
    title: "Multiple Boards",
    description: "Organize different projects with separate boards.",
  },
  {
    icon: <FaTasks className="text-3xl text-green-600" />,
    title: "Task Management",
    description: "Create, edit, move and delete tasks effortlessly.",
  },
  {
    icon: <FaArrowsAlt className="text-3xl text-purple-600" />,
    title: "Drag & Drop",
    description: "Move tasks between columns with a smooth experience.",
  },
  {
    icon: <FaCalendarAlt className="text-3xl text-orange-500" />,
    title: "Due Dates",
    description: "Keep track of deadlines and upcoming work.",
  },
  {
    icon: <FaUserEdit className="text-3xl text-pink-600" />,
    title: "Profile Management",
    description: "Update your personal information anytime.",
  },
  {
    icon: <FaLock className="text-3xl text-red-500" />,
    title: "Secure Login",
    description: "JWT authentication keeps your account protected.",
  },
];

function Features() {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">
        ✨ TaskFlow Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;