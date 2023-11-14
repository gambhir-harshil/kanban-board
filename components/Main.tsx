import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardNav from "./ui/BoardNav/BoardNav";
import useKanbanStore from "@/store/KanbanStore";

export default function Main() {
  const { currentBoard } = useKanbanStore();
  return (
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/* render columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
    <div className="flex flex-col flex-1">{currentBoard && <BoardNav />}</div>
  );
}
