import { Client, Account, Databases } from 'appwrite';

export const DATABASES_ID = "64747cafb8c51754933c"

export const PROJECT_ID = "6474721a5c0764e299af"

export const COLLECTION_ID = "64747cb78396a615e4bf"


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export const account = new Account(client);


// database 

export const databases = new Databases(client);