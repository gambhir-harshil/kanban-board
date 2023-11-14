"use client";
import { useEffect, useState } from "react";
import { Plus, Sidebar as SidebarIcon, Users } from "lucide-react";

import Item from "./Item";
import useKanbanStore from "@/store/KanbanStore";
import useApi from "@/hooks/useApi";
import requests from "@/consts/requests";
import { BoardForm } from "./BoardForm";

export default function Sidebar() {
  const [toggle, setToggle] = useState(false);
  const { boards, setBoards } = useKanbanStore();
  const { response } = useApi(requests.fetchBoards);

  useEffect(() => {
    if (response) {
      setBoards(response.boards);
    }
  }, [response, setBoards]);

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <div className="h-screen border-r-2 border-border flex flex-col max-w-[15%] md:max-w-[20%] lg:max-w-[15%] py-8 gap-4 overflow-y-scroll">
      <Item title={"Boards"} icon={<SidebarIcon />} />
      <Item title={"Members"} icon={<Users />} />
      <div className="flex items-center md:justify-between justify-center px-3 md:px-6 text-muted-foreground">
        <span className="text-muted-foreground font-bold hidden md:block">
          Your boards
        </span>
        <Plus className="cursor-pointer" onClick={handleToggle} />
        {toggle && <BoardForm onToggle={handleToggle} />}
      </div>
      {boards.map((board) => (
        <Item key={board._id} title={board.name} icon={<SidebarIcon />} />
      ))}
    </div>
  );
}
