import {
  FaMoon,
  FaBell,
  FaGlobe,
  FaInfoCircle,
  FaChevronRight,
} from "react-icons/fa";

function SettingCard({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 cursor-pointer">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        </div>

      </div>

      <FaChevronRight className="text-gray-400" />

    </div>
  );
}

function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 ml-50 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="space-y-5">

        <SettingCard
          icon={<FaMoon />}
          title="Appearance"
          subtitle="Light mode (Dark mode coming soon)"
        />

        <SettingCard
          icon={<FaBell />}
          title="Notifications"
          subtitle="Manage notification preferences"
        />

        <SettingCard
          icon={<FaGlobe />}
          title="Language"
          subtitle="English"
        />

        <SettingCard
          icon={<FaInfoCircle />}
          title="About"
          subtitle="TaskFlow v1.0"
        />

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-3">
          Project Information
        </h2>

        {/* Project Information */}

<div className="mt-10 bg-white rounded-2xl shadow-md p-6">

  <h2 className="text-xl font-semibold mb-4">
    Project Information
  </h2>

  <div className="space-y-3 text-gray-700">

    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Application</span>
      <span>TaskFlow</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Version</span>
      <span>v1.0.0</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Frontend</span>
      <span>React + Tailwind CSS</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Backend</span>
      <span>Django REST Framework</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Database</span>
      <span>PostgreSQL</span>
    </div>

    <div className="flex justify-between">
      <span className="font-medium">Drag & Drop</span>
      <span>dnd-kit</span>
    </div>

  </div>

</div>

{/* Developer */}

<div className="mt-6 bg-white rounded-2xl shadow-md p-6 text-center">

  <h2 className="text-xl font-semibold mb-2">
    Developer
  </h2>

  <p className="text-gray-600">
    Developed with ❤️ using modern web technologies.
  </p>

  <p className="mt-2 font-semibold text-blue-600">
    Kathiravan
  </p>

</div>

      </div>

    </div>
  );
}

export default Settings;