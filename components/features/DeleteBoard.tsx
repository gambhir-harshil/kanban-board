import { deleteBoard, fetchBoards } from "@/helpers/board";
import useKanbanStore from "@/store/KanbanStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteBoard() {
  const { currentBoard } = useKanbanStore();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteBoardMutation } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: async () => {
      queryClient.invalidateQueries(["boards"]);
      useKanbanStore.setState((state) => ({
        ...state,
        currentBoard: null,
      }));

      const updatedBoards = await fetchBoards();

      if (updatedBoards.length > 0) {
        useKanbanStore.setState((state) => ({
          ...state,
          currentBoard: updatedBoards[0],
        }));
      }
    },
  });

  async function handleDelete(id) {
    try {
      await deleteBoardMutation(id);
    } catch (err) {
      console.error("Error deleting board: ", err);
    }
  }
  return (
    <Button
      className="bg-red-500 font-semibold h-12 w-12 rounded-full px-3 py-3"
      onClick={() => handleDelete(currentBoard?._id)}
    >
      <Trash2 />
    </Button>
  );
}
