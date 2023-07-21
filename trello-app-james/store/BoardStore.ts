import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedByColumn";
import { Board, Column, TypedColumn } from "@/typings";

interface BoardState{
    board: Board
    getBoard: () => void
    setBoardState: (board: Board) => void
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumn()
        set({ board })
    },

    setBoardState: (board) => set({ board }) // take a board and set the variable in the global state 
}))