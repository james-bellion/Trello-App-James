import { Models } from "appwrite"

export interface Board {
    columns: Map<TypedColumn, Column>
}

export type TypedColumn = "todo" | "inprogress" | "done"

export interface ColumnType { // changed to Column Type
    id: TypedColumn,
    todos: Todo[]
}

export interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image,
}

export interface Image {
    bucketId: string
    fileId: string
}

