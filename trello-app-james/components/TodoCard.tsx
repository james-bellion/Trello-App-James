"use client";
import { useBoardStore } from "@/store/BoardStore";
import { Todo, TypedColumn } from "@/typings";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { todo } from "node:test";
import { 
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { idText } from "typescript";
import { useState, useEffect } from "react"
import getUrl from "../utils/getUrl";
import Image from "next/image";


type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandelProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandelProps,
}: Props) {

    const deleteTask = useBoardStore((state) => state.deleteTask)

    // state to set the resembalance of the image by defualt it will be null
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    // if there is an image it will add that to the state of the todo card component

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
               const url = await  getUrl(todo.image!)

               if (url) {
                setImageUrl(url.toString())
               }
            }

            fetchImage()
        }

    }, [todo]) // when the todo item rerenders this code should re render

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandelProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/* add image here... */}
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
            <Image 
             src={imageUrl}
             alt="Task image"
             width={400}
             height={200}
             className="w-full object-contain rounded-b-md"
             />
         </div>   
      )}
    </div>
  );
}

export default TodoCard;
