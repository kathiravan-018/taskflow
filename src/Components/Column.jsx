import TaskCard from "./TaskCard";
import { FaPlus } from "react-icons/fa";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function Column({ column, tasks, openModal, openEditModal }) {

  const { id, title } = column;

  const { setNodeRef } = useDroppable({
    id,
     data: {
        columnId: id,
    },
  });

  function getTitleColor(title) {
    if (title === "Todo") return "text-blue-700";
    if (title === "Doing") return "text-yellow-500";
    if (title === "Review") return "text-purple-700";
    if (title === "Done") return "text-green-500";
  }

  return (
    <div
      ref={setNodeRef}
       className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-md shadow-xl border border-white/50 rounded-xl p-4 min-h-[500px]"
    >
      <h2 className={`font-bold text-2xl mb-4 ${getTitleColor(title)}`}>
        {title}
      </h2>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={id}
            columnTitle={title}
            openEditModal={openEditModal}
          />
        ))}
      </SortableContext>

      <button
        className="w-full border-2 border-dashed border-slate-300 rounded-xl py-3 cursor-pointer hover:bg-white/40 hover:text-blue-400 transition-all duration-300"
        onClick={() => openModal(id)}
      >
        <FaPlus className="inline mr-2 pb-1 " />
        Add Task
      </button>
    </div>
  );
}

export default Column;