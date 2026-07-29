import { SlCalender } from "react-icons/sl";

function TaskCardOverlay({ task }) {

  function getPriorityColor(priority) {
    if (priority === "High") return "bg-red-100 text-red-700";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-xl w-[260px] rotate-2 opacity-90">

      <h3 className="font-semibold">
        {task.title}
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="flex justify-between mt-4">

        <span
          className={`px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1">
          <SlCalender />
          {formatDate(task.due_date)}
        </div>

      </div>

    </div>
  );
}

export default TaskCardOverlay;