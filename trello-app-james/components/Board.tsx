"use client";

import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";
import { Todo } from "@/typings";

// using zustand for state management
// remember boards have columns inside of them

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handelOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    //check if user dragged card outside of board
    if (!destination) return;

    //handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries()); //copy colunm entries into a new variable
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed); // push removed item into that column taking its place * modified
      const rearangedColumns = new Map(entries); // stored it into a new rearanged column
      // set board state to that new state
      setBoardState({
        ...board,
        columns: rearangedColumns, // modifies the state
      });
    }

    // This step is needed as the indexes are stored as numbers 0,1,2 ect. instead of id's with DND Libary
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)]; // the src dropable id will go into the col and get me the correct col
    const finishColIndex = columns[Number(destination.droppableId)]; // when you draged and droped in the correct way, your rebuiling from a 0 to the object in your store

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;

    const [todoMoved] = newTodos.splice(source.index, 1); //  returns an array the splice function

    if (startCol.id === finishCol.id) {
      //same col task drag
      newTodos.splice(destination.index, 0, todoMoved); // splice into the new location in the same start col
      // create a new col object
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      // create a copy of board cols
      const newColumns = new Map(board.columns);

      // then modify
      newColumns.set(startCol.id, newCol); // set this id to become the new column

      setBoardState({ ...board, columns: newColumns }); // **2.19********@#$%^&*()@@@@@
    } else {
      
      //dragging  to another col
      const finishTodos = Array.from(finishCol.todos) as Todo[]; // added as Todo[]***
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      //update in Db
      updateTodoInDB(todoMoved, finishCol.id)


      setBoardState({...board, columns: newColumns})
    }
  };

  //console.log(board)

  //  in Dropable : converting the board column into an array eg:
  //  Array.from(board.columns.entires())
  //  mapping through all the key value pairs using destructuring.
  //
  // ... the spreads in the div is alowing the dropable to know whats going on
  return (
    <DragDropContext onDragEnd={handelOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols1 md:grid-cols-3 gap-5 max-w-7xl mx-auto p-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
