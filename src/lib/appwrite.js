import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65ab3f1c325d1850db2f');

export const account = new Account(client);
export { ID } from 'appwrite';
