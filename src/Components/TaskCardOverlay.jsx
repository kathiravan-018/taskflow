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
    <div className="
      w-[280px]
      bg-white 
      rounded-xl 
      p-3 
      shadow-xl
      border
      border-gray-100
    ">

      <div className="flex justify-between items-start">

        <h3 className="font-semibold text-base">
          {task.title}
        </h3>

      </div>


      <p className="
        text-sm text-gray-600 
        mt-2 line-clamp-2
      ">
        {task.description}
      </p>


      <div className="
        flex justify-between items-center 
        mt-4
      ">

        <span
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${getPriorityColor(task.priority)}
          `}
        >
          {task.priority}
        </span>

      </div>

    </div>
  );
}

export default TaskCardOverlay;