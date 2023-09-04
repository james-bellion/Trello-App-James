import { Board, Todo, TypedColumn } from "@/typings";

// creating a copy from the board column entries
// first func reducing down into a flat array
// making sure ChatGPT knows how many tasks we have

const formatTodosForAi = (board: Board) => {
  // Get an array of [TypedColumn, Column] pairs
  const todos = Array.from(board.columns.entries());

  // Reduce the array to a flat object with TypedColumn keys and Todo[] values
  const flatArray = todos.reduce(
    (map, [key, value]) => {
      map[key] = value.todos;
      return map;
    },
    {} as Record<TypedColumn, Todo[]> // Use Record to specify the exact type
  );

  // Reduce the flat object to key: value(length)
  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return flatArrayCounted;
};

export default formatTodosForAi;