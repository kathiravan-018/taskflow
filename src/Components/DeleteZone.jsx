import { useDroppable } from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa";

function DeleteZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        fixed
        bottom-8
        right-8
        z-50
        transition-all
        duration-300
        ${isOver ? "scale-80" : ""}
      `}
    >
      <div
        className={`
          flex items-center
          overflow-hidden
          rounded-full
          shadow-xl
          cursor-pointer
          transition-all
          duration-300
          ${
            isOver
              ? "bg-red-600 text-white w-56"
              : "bg-white text-red-600 w-16"
          }
          h-16
        `}
      >
        <div className="w-16 flex justify-center ms-5">
          <FaTrash className="text-2xl" />
        </div>

        <div
          className={`
            whitespace-nowrap
            transition-opacity
            duration-300
            ${isOver ? "opacity-100" : "opacity-0"}
          `}
        >
          <p className="font-semibold">Delete Task</p>
          <p className="text-sm">Drop here</p>
        </div>
      </div>
    </div>
  );
}

export default DeleteZone;