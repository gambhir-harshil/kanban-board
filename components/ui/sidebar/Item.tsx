import { PanelRight } from "lucide-react";

export default function Item({ icon, title }) {
  return (
    <div className="flex items-center gap-4 md:justify-start justify-center cursor-pointer md:hover:bg-muted px-3 md:px-6 lg:px-8 py-3 transition-all ease-in-out text-muted-foreground">
      <span className="cursor-pointer">{icon}</span>
      <span className="font-semibold hidden md:block">{title}</span>
    </div>
  );
}
