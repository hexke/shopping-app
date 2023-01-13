import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'GET') {

        const client = await MongoClient.connect(process.env.DB_HOST);
        
        const db = client.db();

        const listsCollection = db.collection('products');

        const result = await listsCollection.find().toArray();
        

        client.close();

        res.status(200).json({products: result});
    }
}

export default handler;