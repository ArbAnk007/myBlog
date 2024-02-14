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
            return false
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
            return false
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
            return false
        }
    }
        
    async getAllPost(userId) {
        try {
            let postArray = []
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status", ["active"]),
                    Query.notEqual("userId", [userId])
                ]
            )
            const anotherResponse = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("userId", [userId])
                ]
            )
            postArray = [...anotherResponse.documents,...response.documents]
            return postArray
        } catch (error) {
            return false
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService;