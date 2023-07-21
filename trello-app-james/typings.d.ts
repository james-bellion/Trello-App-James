import { Models } from "appwrite"

interface Board {
    columns: Map<TypedColumns, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypedColumns,
    todos: Todo[]
}

interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: string,
}

interface Image {
    bucketId: string
    fileId: string
}