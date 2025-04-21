import {MongoClient} from 'mongodb';

export async function connectToDatabase(){
    const client= await MongoClient.connect('mongodb+srv://Maximilian:uLCvoyuB6kxClocd@cluster0.mwhfzre.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0')
    return client;

}