import {
  FaHome,
  FaClipboardList,
  FaCalendarAlt,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import Taskflow from "../assets/Taskflowlogo.png"
import { FiLogIn } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/",
  },
  {
    name: "Clipboard",
    icon: <FaClipboardList />,
    path: "/board",
  },
  {
    name: "Calendar",
    icon: <FaCalendarAlt />,
    path: "/calendar",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];


export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);


  function handleLogout() {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setIsLoggedIn(false);

    navigate("/login");
  }


  return (

    <aside className="
      fixed left-0 top-0 h-screen w-64 
      bg-white border-r border-gray-200 
      flex flex-col justify-between 
      shadow-lg
    ">


      <div>
      <div className="flex ms-1 mt-2">
        <div className="w-20 h-20 mt-5" >
        <img src={Taskflow} alt="Taskflow logo" />
      </div>

        <h1 className="
          text-2xl font-bold text-blue-600 
          mt-6
        ">
          TaskFlow
        </h1>
      </div>



        <nav className="flex flex-col gap-2 px-4">


          {menuItems.map((item) => (

            <button
              key={item.name}

              onClick={() => navigate(item.path)}

              className={`
                flex items-center gap-4 
                px-4 py-3 rounded-xl 
                transition-all duration-300

                ${
                  location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >

              <span className="text-xl">
                {item.icon}
              </span>


              <span className="text-base">
                {item.name}
              </span>


            </button>

          ))}


        </nav>


      </div>



      <div className="
        px-4 pb-6 
        flex flex-col gap-2
      ">



        {
          !isLoggedIn ? (

            <button
              onClick={() => navigate("/login")}

              className="
                flex items-center gap-4 
                px-4 py-3 rounded-xl 
                text-gray-600 
                hover:bg-blue-50 
                hover:text-blue-600 
                transition-all
              "
            >

              <FiLogIn className="text-2xl" />

              <span>
                Login
              </span>

            </button>


          ) : (


            <>


              <button

                onClick={() => navigate("/profile")}

                className={`
                  flex items-center gap-4 
                  px-4 py-3 rounded-xl 
                  transition-all

                  ${
                    location.pathname === "/profile"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >

                <FaUserCircle className="text-xl" />

                <span>
                  Profile
                </span>

              </button>




              <button

                onClick={handleLogout}

                className="
                  flex items-center gap-4 
                  px-4 py-3 rounded-xl 
                  text-red-500 
                  hover:bg-red-50 
                  transition-all
                "
              >

                <FaSignOutAlt className="text-xl" />

                <span>
                  Logout
                </span>

              </button>


            </>


          )
        }



      </div>



    </aside>

  );
}