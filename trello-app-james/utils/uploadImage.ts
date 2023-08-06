import { ID, storage } from "@/appwrite"

const uplaodImage = async ( file: File) => {
    if (!file) return 

    const fileUploaded = await storage.createFile(
        "64bdcfe889496660b7aa",
        ID.unique(),
        file
    )

    return fileUploaded
}

export default uplaodImage

// when uploading a file appwrite gives it a unique Id, then we can pass in the file 