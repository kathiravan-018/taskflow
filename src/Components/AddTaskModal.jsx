import { useState, useEffect } from "react";
import { toast } from "sonner";

function AddTaskModal({ onClose, onSave, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [due_date, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Low");
      setDueDate(editingTask.due_date || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");
    }
  }, [editingTask]);

  function handleSave() {
    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }

    if (!due_date) {
      toast.error("Due date is required!");
      return;
    }

    const newTask = {
      id: editingTask ? editingTask.id : null,
      title,
      description,
      priority,
      due_date,
    };

    onSave(newTask);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <label
          htmlFor="priority"
          className="text-lg text-gray-700"
        >
          Choose Priority :
        </label>

        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded-lg p-2 mb-5"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <label
          htmlFor="due_date"
          className="text-lg text-gray-700"
        >
          Due Date :
        </label>

        <input
          type="date"
          id="due_date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-lg p-2 mb-5"
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingTask ? "Update Task" : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;