// import { storage } from "@/appwrite"

// const getUrl = async (image: Image) => {
//     const url = storage.getFilePreview(image.bucketID, image.fileId)

//     return url
// }

// export default getUrl

import { storage } from "@/appwrite"; // Import the Appwrite storage module
import { Image } from "@/typings";

const getUrl = async (image: Image) => {
  try {
    const url = await storage.getFilePreview(image.bucketId, image.fileId); // Provide bucketId and fileId
    return url;
  } catch (error) {
    // Handle errors
    console.error("Error fetching file preview:", error);
    return null; // Return a default value or handle the error as needed
  }
};

export default getUrl;