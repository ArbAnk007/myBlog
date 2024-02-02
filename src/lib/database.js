import {Client, Databases, ID, Query} from "appwrite"
import config from "../config/config"

export class DatabaseService {
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId)
        
        this.databases = new Databases(this.client)
    }

    async createPost({title, content, featuredImageId, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImageId,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("lib :: databases :: createPost :: error", error);
        }
    }

    async updatePost(documentId, {title, content, featuredImageId, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredImageId,
                    status
                }
            )
        } catch (error) {
            console.log("lib :: databases :: updatePost :: error", error);
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId
            );
            return true
        } catch (error) {
            console.log("lib :: databases :: deletePost :: error", error);
            return false
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId
            )
        } catch (error) {
            console.log("lib :: databases :: getPost :: error", error);
            return false
        }
    }
        
    async getAllPost(queries=[Query.equal("status",["active"])]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("lib :: databases :: getAllPost :: error", error);
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService;