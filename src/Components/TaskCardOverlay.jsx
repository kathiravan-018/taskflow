function TaskCardOverlay({ task }) {

  function getPriorityColor(priority) {
    if (priority === "High") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  }


  return (
    <div className="w-[280px] bg-white rounded-xl p-4 shadow-xl rotate-3">

      <h3 className="text-lg font-semibold break-all">
        {task.title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 break-all line-clamp-3">
        {task.description}
      </p>


      <div className="mt-4">
        <span
          className={`px-3 py-2 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>

    </div>
  );
}

export default TaskCardOverlay;