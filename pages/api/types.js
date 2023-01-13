import { MongoClient } from "mongodb";


async function handler(req, res) {
    if (req.method === 'GET') {

        const client = await MongoClient.connect(process.env.DB_HOST);

        const db = client.db();

        const typesCollection = db.Collection('productTypes');

        const result = await typesCollection.find().toArray();

        client.close();

        res.send(201).json({ types: result });
    }
}

export default handler;