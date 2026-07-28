import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const navigate = useNavigate();

 const {
    setIsLoggedIn,
    setUser,
} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await API.post("login/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const profileResponse = await API.get("profile/");
      setUser(profileResponse.data);
      setIsLoggedIn(true);
     

      toast.success("Login Successful ");
      

      navigate("/");
    } catch (error) {
      toast.error("Invalid username or password");
      console.log(error.response?.data);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to your Trella account
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;