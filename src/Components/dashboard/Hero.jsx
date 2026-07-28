import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl p-8 min-h-[180px] shadow-xl text-white flex justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold mb-3">
          Welcome  to Taskflow
        </h1>

        <p className="text-blue-100 text-lg max-w-md">
          Manage all your projects and tasks efficiently in one place.
        </p>
      </div>

      <button className="flex items-center gap-3 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={()=>navigate('/board')}>
        <FaPlus />
        New Task
      </button>

    </div>
  );
}

export default Hero;