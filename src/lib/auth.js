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
            console.log("lib :: auth :: login :: error", error);
        }
    }

    async signUp({email, password, name}) {
        try {
            await this.account.create(ID.unique(), email, password, name);
            return await this.login({email, password});
        } catch (error) {
            console.log("lib :: auth :: signUp :: error", error);
        }
    }

    async logOut() {
        try{
            await this.account.deleteSessions("all");
        } catch (error) {
            console.log("lib :: auth :: logOut :: error", error);
        }
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        } catch (error) {
            console.log("lib :: auth :: getCurrentUser :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService