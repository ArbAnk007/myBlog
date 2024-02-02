import { Client, Account, ID } from 'appwrite';
import config from "../config/config"

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            return false
        }
    }

    async signUp({email, password, name}) {
        try {
            await this.account.create(ID.unique(), email, password, name);
            return await this.login({email, password});
        } catch (error) {
            return false
        }
    }

    async logOut() {
        try{
            await this.account.deleteSessions("all");
        } catch (error) {
            return false
        }
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        } catch (error) {
            return false
        }
    }
}

const authService = new AuthService()

export default authService