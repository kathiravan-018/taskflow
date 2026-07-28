import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    college: "",
    city: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await API.post("register/", formData);
      setIsLoggedIn(true);
      toast.success("Registration Successful ");

      navigate("/login");
    } catch (error) {
      toast.error("Registration Failed");
      console.log(error.response?.data);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-[430px]">

        <h1 className="text-3xl font-bold text-center text-violet-700">
          Create Account ✨
        </h1>

        <p className="text-center text-gray-500 mb-5">
          Join Trella and organize your work
        </p>

        <form onSubmit={handleRegister} className="space-y-3">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5 focus:outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;