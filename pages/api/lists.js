import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'GET') {

        const client = await MongoClient.connect(process.env.DB_HOST);
        
        const db = client.db();

        const listsCollection = db.collection('lists');

        const result = await listsCollection.find();
        
        client.close();

        res.status(201).json({message: 'Lista została dodana.'});
    }
}

export default handler;