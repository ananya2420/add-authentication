// lib/db.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export async function connectToDatabase() {
  if (!clientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  }
  return await clientPromise;
}
