import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import API from "../api/axios";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
}, []);

async function fetchTasks() {
    try {
        const response = await API.get("tasks/");
        setTasks(response.data);
    } catch (error) {
        console.log(error);
    }
}

  function getPriorityColor(priority) {
    if (priority === "High") return "bg-red-100 text-red-600";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  }

  const upcomingTasks = tasks
  .filter((task) => new Date(task.due_date) >= new Date())
  .sort(
    (a, b) => new Date(a.due_date) - new Date(b.due_date)
  );

  const selectedTasks = tasks.filter(
  (task) =>
    new Date(task.due_date).toDateString() ===
    date.toDateString()
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 ml-15 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Calendar
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Calendar */}

        <div className="bg-white rounded-3xl shadow-lg p-20">

          <Calendar
  onChange={setDate}
  value={date}
  className="w-full border-none"
  tileContent={({ date }) => {
    const hasTask = tasks.some(
      (task) =>
        new Date(task.due_date).toDateString() ===
        date.toDateString()
    );

    return hasTask ? (
      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
    ) : null;
  }}
/>

        </div>

        {/* Upcoming Tasks */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Upcoming Tasks
          </h2>

          <div className="space-y-4">

          {selectedTasks.length > 0 ? (
  selectedTasks.map((task) => (
    <div
      key={task.id}
      className="border rounded-xl p-4 flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <SlCalender />
          {new Date(task.due_date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
          task.priority
        )}`}
      >
        {task.priority}
      </span>
    </div>
  ))
) : (
  <p className="text-center text-gray-500 mt-10">
    No tasks for this date.
  </p>
)}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CalendarPage;