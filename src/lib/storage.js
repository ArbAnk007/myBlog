import {Client, Storage, ID} from "appwrite"
import config from "../config/config"

export class StorageService {
    client = new Client()
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId)
        
        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            return false
        }
    }

    getFile(fileId) {
        try {
            return this.storage.getFileDownload(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            return false
        }
    }

}

const storageService = new StorageService()

export default storageService