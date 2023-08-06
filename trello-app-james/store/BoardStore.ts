import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedByColumn";
import { Board, Column, Todo, TypedColumn, Image } from "@/typings";
import { ID, databases, storage } from "@/appwrite";
import uploadImage from "@/utils/uploadImage";


interface BoardState{
    board: Board
    getBoard: () => void
    setBoardState: (board: Board) => void
    updateTodoInDB: (todo: Todo, columnID: TypedColumn) => void
    newTaskInput: string
    newTaskType: TypedColumn
    image: File | null

    searchString: string
    setSearchString: (searchString: string) => void

    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void // pushig it into the database
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void

    setNewTaskInput: (input: string) => void
    setNewTaskType: (columnId: TypedColumn) => void
    setImage: (image: File | null) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },

    // default values
    searchString: "",
    newTaskInput: "",
    newTaskType: "todo",
    setSearchString: (searchString) => set({ searchString }),
    image: null,


    getBoard: async () => {
        const board = await getTodosGroupedByColumn()
        set({ board })
    },


    setBoardState: (board) => set({ board }), // take a board and set the variable in the global state 
 
    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColumns = new Map(get().board.columns) // copy of current map, get acces of current state
    
        // delete todoId from newColumns
        newColumns.get(id)?.todos.splice(taskIndex, 1) // on front end:  changes the exisiting state > modify it
    
        set({ board: { columns: newColumns } })

        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        } // deletes the image

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        ) // deleates the document itself
    
    },

    setNewTaskInput: (input: string) => set({ newTaskInput: input }),
    setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
    setImage: (image: File | null) => set({ image }),

    updateTodoInDB: async (todo, columnId) => { // update in DB
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title, // passing in what the updated info is
                status: columnId,  
            }
        )
    },

    // adding new task 
    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined

        if (image) {
            const fileUploaded = await uploadImage(image)
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }

        const  { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                //include image if it exists
                ...(file && { image: JSON.stringify(file) }),
            }
        )

        set ({ newTaskInput: "" })

        set ((state) => {
            const newColumns = new Map(state.board.columns)

            // for fornt end updating
            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                // include image if it exists
                ...(file && { image: file })
            }

            const column = newColumns.get(columnId) // get the col that the person has entered the todo into

            //there was no col, then will set the col ID and add the todo , otherwise it will grab the current col.
            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],
                })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo)
            }

            // when the new cols are set up we will return the board itself
            return {
                board: {
                    columns: newColumns,
                }
            }
        })

    }

}))