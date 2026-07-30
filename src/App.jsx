import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Board from "./Components/Board";
import Calendar from "./Pages/Calendar";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Pages/ProtectedRoute"


export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-56 flex-1 min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100">
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/board" 
          element={  <ProtectedRoute>
                        <Board />
                      </ProtectedRoute>} />
          <Route path="/calendar" 
          element={ <ProtectedRoute>
                        <Calendar /> 
                    </ProtectedRoute>} />
          <Route path="/settings" 
          element={
                    <ProtectedRoute>
                       <Settings />
                    </ProtectedRoute>} />
          <Route path="/profile" 
          element={ <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute> } />
          <Route path="/login" element={<Login/>} />
          <Route path="register" element={<Register/>}/>
        </Routes>
      </main>
    </div>
  );
}