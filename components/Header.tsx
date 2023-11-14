import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 w-full border-b-2 border-border">
      <h1 className="text-[32px] font-extrabold uppercase tracking-wider hidden sm:block">
        Kanban
      </h1>
      <h1 className="text-[32px] font-extrabold uppercase tracking-wider sm:hidden">
        K.
      </h1>
      <div className="max-w-[50%] min-w-[30%]">
        <Input placeholder="Search" />
      </div>
      <ModeToggle />
    </header>
  );
}
