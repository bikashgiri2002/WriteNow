import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class AppService {
  client = new Client();
  account;
  databse;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({title, content, featuredImage, status, userId, slug}) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabeseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )

    }catch(err) {
      console.error(err);
    }
  }
  async updatePost(slug,{title, content, featuredImage, status}){
    try {
      return await this.database.updateDocument(
        config.appwriteDatabeseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
      
    } catch (error) {
      console.error(error)
    }
  }
  async deletePost(slug){
    try {
      await this.database.deleteDocument(
        config.appwriteDatabeseId,
        config.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log("error in delete document", error)
      return false
    }

  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabeseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Error in get document", error)
      return false
    }
  }

  async listPost(queries = [Query.equal('status', 'active')]){
    try {
      return await this.database(
        config.appwriteDatabeseId,
        config.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.error("Error in find all post", error)
      return false
    }
  }

  // file upload and delete

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Error : appWriteService: upload file", error);
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
      console.log("Error : appWriteConfig :: deleteFile", error)
      return false
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }
}

const appService = new AppService();

export default appService;
