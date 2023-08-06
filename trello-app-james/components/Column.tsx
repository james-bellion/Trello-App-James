import { Todo, TypedColumn } from "@/typings"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { todo } from "node:test"
import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "./TodoCard"
import { useBoardStore } from "@/store/BoardStore"
import { useModalStore } from "@/store/ModalStore"

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

// mapping function
const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
}

function Column({id, todos, index}: Props) {

    const [searchString, setNewTaskType] = useBoardStore((state) => [
        state.searchString,
        state.setNewTaskType,
    ])
    const openModal = useModalStore((state) => state.openModal)

    const handelAddtodo = () => {

        setNewTaskType(id)
        openModal()
    }
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
            >
                {/* render dropable todos in the column */}
                <Droppable droppableId={index.toString()} type="card">
                {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-2 rounded-2xl shadow-sm ${
                        snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50 "
                      } `}  
                    >
                        
                        <h2 className="flex justify-between font-bold text-xl"> 
                            {idToColumnText[id]} 
                            <span className="text-grey-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                                
                                {!searchString ? todos.length : todos.filter((todo) =>
                                   todo.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())).length}

                            </span>
                        
                        </h2>

                        <div className="space-y-2">
                            {todos.map((todo, index) => {

                                if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase()))
                                 return null // logic for searching 
                            
                            return(
                                <Draggable
                                 key={todo.$id}
                                 draggableId={todo.$id}
                                 index={index}
                                >
                                    {(provided) => (
                                        <TodoCard 
                                         todo={todo}
                                         index={index}
                                         id={id}
                                         innerRef={provided.innerRef}
                                         draggableProps={provided.draggableProps}
                                         dragHandelProps={provided.dragHandleProps}
                                        />
                                    )}
                                </Draggable>
                            )})}
                            {provided.placeholder}

                            <div className="flex items-end justify-end p-2">
                                <button 
                                 onClick={handelAddtodo}
                                 className="text-green-500 hover:text-green-600 ">
                                    <PlusCircleIcon 
                                     className="h-10 w-10"
                                    />
                                </button>
                            </div>
                        </div>


                    </div>

                )}
                </Droppable>
            </div>
        )}
    </Draggable>
  )
}

export default Column