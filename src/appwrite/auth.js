import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (!userAccount) throw new Error('Account creation failed');
        return this.login({ email, password }); // auto-login after signup
    }

    async login({ email, password }) {
        return this.account.createEmailSession(email, password);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error);
        }
    }

    isLoggedIn() {
        return this.getCurrentUser().then(user => !!user);
    }
}

const authService = new AuthService();
export default authService;
