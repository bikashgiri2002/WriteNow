import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAcoount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({ email, password });
      } else {
        return new Error("Failed to create account");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create account");
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to login");
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get user");
    }
    // eslint-disable-next-line no-unreachable
    return null;
  }

  async logOut() {
    try {
      const logout = await this.account.deleteSessions();
      if (logout) {
        return true;
      } else {
        return new Error("Failed to logout");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to logout");
    }
  }
}

const authService = new AuthService();

export default authService;
