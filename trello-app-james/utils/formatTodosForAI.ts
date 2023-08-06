import { Board, Todo, TypedColumn } from "@/typings";

// creating a copy from the board column entires 

// first func reducing down into a flat array

// making sure chat gbt knows how many tasks we have 

const formatTodosForAi = (board: Board) => {
    const todos = Array.from(board.columns.entries())

     const flatArray = todos.reduce((map, [key, value]) => {
         map[key] = value.todos
         return map
     }, {} as { [key in TypedColumn]: Todo[] }) // todo, in progress, done with the todo array attached to it 

   // reduce to key: value(length)
   const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) =>{
        map[key as TypedColumn] = value.length
        return map
    },
    {} as { [key in TypedColumn]: number }
   )

   return flatArrayCounted

}

export default formatTodosForAi