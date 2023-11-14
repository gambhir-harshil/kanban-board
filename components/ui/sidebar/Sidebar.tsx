"use client";
import { useEffect, useState } from "react";
import { Plus, Sidebar as SidebarIcon, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import SidebarItem from "./SidebarItem";
import useKanbanStore from "@/store/KanbanStore";
import AddBoardForm from "../../features/AddBoardForm";
import { fetchBoards } from "@/helpers/board";

export default function Sidebar() {
  const [toggle, setToggle] = useState(false);
  const { boards, setBoards, currentBoard } = useKanbanStore();

  const { data } = useQuery({
    queryFn: () => fetchBoards(),
    queryKey: ["boards"],
  });

  useEffect(() => {
    if (data) {
      setBoards(data);

      if (data.length > 0 && !currentBoard) {
        useKanbanStore.setState((state) => ({
          ...state,
          currentBoard: data[0],
        }));
      }
    }
  }, [data, setBoards, currentBoard]);

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleItemSelect(boardId) {
    const selectedBoard = boards.find((board) => board._id === boardId);

    if (selectedBoard) {
      useKanbanStore.setState((state) => ({
        ...state,
        currentBoard: selectedBoard,
      }));
    }
  }

  return (
    <div
      className="border-r-2 border-border flex flex-col max-w-[15%] md:max-w-[20%] lg:max-w-[15%] py-8 gap-4 overflow-y-scroll"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <SidebarItem title={"Boards"} icon={<SidebarIcon />} selected={false} />
      <SidebarItem title={"Members"} icon={<Users />} selected={false} />
      <div className="flex items-center md:justify-between justify-center px-3 md:px-6 gap-6 text-muted-foreground border-b-2 border-border pb-4">
        <span className="text-muted-foreground font-bold hidden md:block">
          Your boards
        </span>
        <Plus className="cursor-pointer" onClick={handleToggle} />
        {toggle && <AddBoardForm onToggle={handleToggle} />}
      </div>
      {boards.map((board) => (
        <div key={board._id} onClick={() => handleItemSelect(board._id)}>
          <SidebarItem
            title={board.name}
            icon={<SidebarIcon />}
            selected={currentBoard?._id === board._id}
          />
        </div>
      ))}
    </div>
  );
}
