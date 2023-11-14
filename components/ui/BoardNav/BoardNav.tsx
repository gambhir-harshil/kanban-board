import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useKanbanStore from "@/store/KanbanStore";
import { Button } from "../button";
import { deleteBoard, fetchBoards } from "@/helpers/board";
import UpdateBoardForm from "../../features/UpdateBoardForm";
import DeleteBoard from "@/components/features/DeleteBoard";
import { Pencil } from "lucide-react";

export default function BoardNav() {
  const [toggle, setToggle] = useState(false);
  const { currentBoard } = useKanbanStore();

  return (
    <div className="relative w-full py-3 px-6 backdrop-blur-md bg-primary/30">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-2xl">{currentBoard?.name}</h1>
          <p className="font-semibold text-muted-foreground text-sm tracking-wide">
            ({currentBoard?.description})
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            className="bg-green-500 font-semibold h-12 w-12 rounded-full px-3 py-3"
            onClick={() => setToggle(!toggle)}
          >
            <Pencil />
          </Button>
          <DeleteBoard />
          {toggle && <UpdateBoardForm onToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
}
