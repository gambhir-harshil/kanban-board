import { create } from 'zustand'

interface Board {
    _id: string;
    name : string;
    description: string;
}

interface KanbanStore {
  boards: Board[];
  currentBoard: Board | null,
  setBoards: (newBoards: Board[]) => void;
  addBoard: (newBoard: Board) => void;
  removeBoard: (boardId: string) => void;
}

const useKanbanStore = create<KanbanStore>((set) => ({
  boards: [],
  currentBoard: null,
  setBoards: (newBoards) => set({boards: newBoards}),
  addBoard: (newBoard) => set((state) => ({ boards: [...state.boards, newBoard] })),
  removeBoard: (boardId) => set((state) => ({ boards: state.boards.filter((board) => board._id !== boardId) })),
}));

export default useKanbanStore;
