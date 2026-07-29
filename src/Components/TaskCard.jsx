import { SlCalender } from "react-icons/sl";
import { MdOpacity, MdOutlineModeEdit } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ columnId,columnTitle, task, openEditModal }) {

  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,

} = useSortable({
  id: task.id,
  data: {
    task,
    columnId,
  },
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.5 : 1,
};

  function getPriorityColor(priority) {
    if (priority === "High") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

 return (
  <div
    ref={setNodeRef}
    style={style}
    className={`bg-white rounded-xl p-3 shadow-sm 
    hover:shadow-lg transition-all mb-3
     ${isDragging ? "shadow-xl " : ""}`}
  >

    {/* Header */}
    <div className="flex justify-between items-start">

      <h3
        {...attributes}
        {...listeners}
        className="font-semibold text-base cursor-grab"
      >
        {task.title}
      </h3>

      <button
        onClick={() => openEditModal(columnId, task)}
        className="p-1 rounded-md hover:bg-gray-100"
      >
        <MdOutlineModeEdit className="text-gray-500"/>
      </button>

    </div>


    {/* Description */}
    <p className="
      text-sm text-gray-600 
      mt-2 line-clamp-2
    ">
      {task.description}
    </p>


    {/* Footer */}
    <div className="
      flex justify-between items-center 
      mt-4
    ">

      <span
        className={`px-3 py-1 rounded-full text-sm font-medium
        ${getPriorityColor(task.priority)}
        `}
      >
        {task.priority}
      </span>


      <div className="
        flex items-center gap-1
        text-lg text-gray-500 
        
      ">
        <SlCalender/>

        <span>
          {formatDate(task.due_date)}
        </span>

      </div>

    </div>

  </div>
)
}

export default TaskCard;