import { createContext, useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "sonner";

export const BoardContext = createContext();

function BoardProvider({ children }) {

    const [boards, setBoards] = useState([]);

    async function fetchBoards() {
        try {

            const response = await API.get("boards/");
            setBoards(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load boards");

        }
    }

    useEffect(() => {
        fetchBoards();
    }, []);

        const allTasks = boards.flatMap((board) =>
    board.columns.flatMap((column) => column.tasks)
    );
    

    const totalTasks = allTasks.length;

    const completedTasks = boards.reduce((count, board) => {
  return (
    count +
    board.columns
      .filter(column => column.title === "Done")
      .reduce((sum, column) => sum + column.tasks.length, 0)
  );
}, 0);

    const highPriorityTasks = allTasks.filter(
    (task) => task.priority === "High"
    ).length;

    return (
        <BoardContext.Provider
                value={{
            boards,
            fetchBoards,
            totalTasks,
            completedTasks,
            highPriorityTasks,
        }}
        >
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;