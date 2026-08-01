import Header from "./Header";
import Column from "./Column";
import AddTaskModal from "../Components/AddTaskModal";
import { useState, useEffect, useContext } from "react";
// 1. ADDED: Imported useSensor, useSensors, and PointerSensor for drag precision
import { DndContext, DragOverlay, closestCorners, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCardOverlay from "../Components/TaskCardOverlay";
import { toast } from "sonner";
import DeleteZone from "../Components/DeleteZone";
import API from "../api/axios";
import AddBoardModal from "../Components/AddBoardModal";
import { BoardContext } from "../Context/BoardContext";

function Board() {
  const [columns, setColumns] = useState([]);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedColumnId, setselectedColumnId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [search, setSearch] = useState("");

  const { boards, fetchBoards } = useContext(BoardContext);

  // 2. ADDED: Sensor configuration to stop accidental drag triggers on mouse click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag triggers only after moving 8px, eliminating click/drop mismatches
      },
    })
  );

  useEffect(() => {
    if (!boards.length) return;

    const currentBoard =
      boards.find((b) => b.id === selectedBoard?.id) || boards[0];

    setSelectedBoard(currentBoard);
    setColumns(currentBoard.columns);
  }, [boards]);

  async function createBoard(title) {
    if (!title.trim()) {
      toast.error("Board title is required");
      return;
    }
    try {
      await API.post("boards/", { title });
      toast.success("Board created successfully");
      setShowBoardModal(false);
      await fetchBoards();
    } catch (error) {
      toast.error("Failed to create board");
      console.log(error);
    }
  }
  
  async function addTask(task) {
    try {
      if (editingTask) {
        await API.patch(`tasks/${editingTask.id}/`, {
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: task.due_date,
        });
        toast.success("Task updated successfully");
      } else {
        console.log({
          column: selectedColumnId,
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_Date: task.due_Date,
        });
        await API.post("tasks/", {
          column: selectedColumnId,
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: task.due_date,
        });
        toast.success("Task added successfully");
      }
      setShowModal(false);
      setEditingTask(null);
      fetchBoards();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Operation failed");
    }
  }

  function openModal(columnId) {
    setselectedColumnId(columnId);
    setShowModal(true);
  }

  function openEditModal(columnId, task){
    setselectedColumnId(columnId);
    setEditingTask(task);
    setShowModal(true);
  }

  function handleDragStart(event){
    setActiveTask(event.active.data.current.task);
  }

  async function handleDragEnd(event) {
    const { active, over } = event;

    console.log("OVER:", over);
    console.log("OVER ID:", over?.id);
    console.log("OVER DATA:", over?.data?.current);

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.data?.current?.columnId ?? over.id;

    console.log("Active:", active.id);
    console.log("Over:", over.id);
    console.log("From:", activeColumnId);
    console.log("To:", overColumnId);

    // ==========================
    // Delete Task
    // ==========================
    if (over.id === "trash") {
      try {
        await API.delete(`tasks/${active.id}/`);
        toast.success("Task deleted successfully");
        fetchBoards();
      } catch (error) {
        console.log(error.response?.data);
        toast.error("Couldn't delete task");
      } finally {
        setActiveTask(null);
      }
      return;
    }

    // ==========================
    // Reorder in same column
    // ==========================
    if (activeColumnId === overColumnId) {
      const column = columns.find((c) => c.id === activeColumnId);

      const oldIndex = column.tasks.findIndex(
        (task) => task.id === active.id
      );

      const newIndex = column.tasks.findIndex(
        (task) => task.id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        setActiveTask(null);
        return;
      }

      const reorderedTasks = arrayMove(
        column.tasks,
        oldIndex,
        newIndex
      );

      setColumns(
        columns.map((column) =>
          column.id === activeColumnId
            ? { ...column, tasks: reorderedTasks }
            : column
        )
      );

      setActiveTask(null);
      return;
    }

    // ==========================
    // Move to another column
    // ==========================
    let draggedTask = null;

    const updatedColumns = columns.map((column) => {
      if (column.id === activeColumnId) {
        draggedTask = column.tasks.find(
          (task) => task.id === active.id
        );

        return {
          ...column,
          tasks: column.tasks.filter(
            (task) => task.id !== active.id
          ),
        };
      }

      return column;
    });

    const finalColumns = updatedColumns.map((column) => {
      if (column.id === overColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, draggedTask],
        };
      }

      return column;
    });

    // Update UI immediately
    setColumns(finalColumns);

    try {
      console.log("Before PATCH");
      console.log("Moving task", active.id, "to column", overColumnId);

      await API.patch(`tasks/${active.id}/`, {
        column: overColumnId,
      });

      console.log("PATCH completed");
      await fetchBoards();
      console.log("Fetched latest boards");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Couldn't move task");
      await fetchBoards();
    } finally {
      setActiveTask(null);
    }
  }

  if (boards.length === 0) {
    return (
      <div className="flex-1 px-6 py-5">
        <Header search={search} setSearch={setSearch} />
        <div className="flex h-[80vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">No Boards Yet</h1>
            <button
              onClick={() => setShowBoardModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              + Create Board
            </button>
          </div>
        </div>
        {showBoardModal && (
          <AddBoardModal onClose={() => setShowBoardModal(false)} onCreate={createBoard} />
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <Header search={search} setSearch={setSearch}/>
      
      {/* 3. MODIFIED: Added sensors configuration and changed collisionDetection to closestCorners */}
      <DndContext 
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={closestCorners}
      > 
        {/* Board switcher tabs */}
        <div className="flex items-center gap-3 mb-6 ms-4 flex-wrap">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => {
                setSelectedBoard(board);
                setColumns(board.columns);
              }}
              className={`px-4 py-2 rounded-lg transition ${
                selectedBoard?.id === board.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
            >
              {board.title}
            </button>
          ))}
          <button
            onClick={() => setShowBoardModal(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition"
          >
            + New Board
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto mt-5 pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={column.tasks.filter(task =>
                task.title.toLowerCase().includes(search.toLowerCase())
              )}
              openModal={openModal}
              openEditModal={openEditModal}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask && (
            <TaskCardOverlay task={activeTask}/>
          )}
        </DragOverlay>
        {activeTask && <DeleteZone />}
      </DndContext>

      {showBoardModal && (
        <AddBoardModal onClose={() => setShowBoardModal(false)} onCreate={createBoard} />
      )}

      {showModal && (
        <AddTaskModal
          editingTask={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={addTask}
        />
      )}
    </div>
  );
}

export default Board;
