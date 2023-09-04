import { databases } from "@/appwrite"
import { Board, ColumnType, TypedColumn } from "@/typings"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    )

    const todos = data.documents

    //console.log(todos)

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status) ) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            // get image if it exists on the todo
            ...(todo.image && { image: JSON.parse(todo.image) })
        })

        return acc

    }, new Map<TypedColumn, ColumnType>)

    //console.log(columns)

    // if columns doesnt have inprogress, todo and done, add them with empty todos:
    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"]
    
    //make sure we can render out this colunm all the time even if there is no task in it
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            })
        }
    }

    // we will always get a map of the three columns
    //console.log(columns)


    //sort cluumns by column types eg todo, inprog, done
    // reagange the columns in a row of todo, inprog, done when you refresh

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))

        
    )

    const board: Board = {
        columns: sortedColumns
    }

    return board
}

// Page Notes
// this is a helper function to : this will get our data and make sure that I have our key value feilds to populate the right columns.
 
// map has a todo entry has a value with the todos inside
// transformed data: taken an array response and transformed it into a map