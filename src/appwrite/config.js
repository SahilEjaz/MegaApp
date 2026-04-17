import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';


export class Service{
    client = new Client();
    Databases;
    Bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases =new Databases(this.client);
        this.bucket= new Storage(this.client);
        
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
         return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,{
                title,
                content,
                featuredImage,
                status,
                userId,

            }
         );
            
        } catch (error) {
            throw error;
            
        }
    }
    async updatePost(slug,{title, content, featuredImage, status, userId}){
        try {
           return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {

            throw error;
            return false;
        }
    }
    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
                
            )
            return true;
            
        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPost(){
        try {
           return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            throw error;
            return false;
            
        }
    }
    async getPosts(quaries = [Query.equal("status","active")]){
        try {
           return await this.Databases.listDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quaries,
            )
            
        } catch (error) {
            throw error;
            return false;
        }

    }

    //file upload service

    async uploadFile(file){
        try {
            await this.Bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file

            )
            
        } catch (error) {
            throw error;
            return false;
            
        }
    }
    async deleteFile(fileId){
        try {
            await this.Bucket.deleteFile(
                conf.appwriteBucketId,
                fileId

            )
            return true;
            
        } catch (error) {
            throw error;
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service= new Service();

export default service;