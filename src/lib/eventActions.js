
import { ID } from "appwrite";
import { databases } from "./appwrite";
import appwriteCollectionId_2 from "./appwriteCollectionId_2";
import appwriteDatabaseId from "./appwriteDatabaseId";

export const handlePostEvent = async ({ title, createdAt, content }) => {
    try {
        const response = await databases.createDocument(

            appwriteDatabaseId,       // 🔁 Replace with your DB ID
            appwriteCollectionId_2,     // 🔁 Replace with your Collection ID
            ID.unique(),
            {
                title,
                createdAt,
                content,
            }
        );
        return response;
    } catch (error) {
        console.error("Failed to post event:", error);
        throw error;
    }
};
