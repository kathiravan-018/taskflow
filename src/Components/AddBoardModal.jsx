import { useState } from "react";

function CreateBoardModal({ onClose, onCreate }) {

  const [title, setTitle] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-2xl font-bold mb-4">
          Create Board
        </h2>

        <input
          type="text"
          placeholder="Board Name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={()=>onCreate(title)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateBoardModal;