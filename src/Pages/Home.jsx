import Hero from "../Components/dashboard/Hero";
import Features from "../Components/dashboard/Features";

import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaFire,
} from "react-icons/fa";

function Home() {

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-8 ml-10">

      <Hero />
      <Features  />
    </div>
  );
}

export default Home;