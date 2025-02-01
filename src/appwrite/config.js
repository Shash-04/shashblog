import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;


    constructor() {
        this.client = new Client();

        this.client
            .setEndpoint("https://cloud.appwrite.io/v1") // Change to your Appwrite endpoint
            .setProject("678a58fb0039e96f3f8d");

        this.account = new Account(this.client); // ✅ Ensure this is initialized
        this.bucket = new Storage(this.client);
        this.databases = new Databases(this.client);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error getting current user:", error);
            return null;
        }
    }
    async isAuthenticated() {
        try {
            const user = await this.getCurrentUser();
            return Boolean(user);
        } catch {
            return false;
        }
    }

    async createPost({ title, slug, content, featuredimage, status, userId }) {  // Remove userId from parameters
        try {
            const currentUser = await this.getCurrentUser();
            if (!currentUser) {
                throw new Error("User not authenticated");
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId: currentUser.$id, // Use the current user's ID
                }

            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            const currentUser = await this.getCurrentUser();
            if (!currentUser) {
                throw new Error("User not authenticated");
            }

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error; // Make sure to throw the error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            if (!file) throw new Error("No file provided for upload");
            // Ensure user is authenticated
            const user = await this.account.get();
            if (!user) throw new Error("User not authenticated");

            // Upload file
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }


    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            console.error("getFilePreview Error: Missing fileId");
            return null; // Or return a default image URL
        }
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
    
}


const service = new Service()
export default service