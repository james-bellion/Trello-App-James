import { Models } from "appwrite"

export interface Board {
    columns: Map<TypedColumns, Column>
}

export type TypedColumn = "todo" | "inprogress" | "done"

export interface Column {
    id: TypedColumns,
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

