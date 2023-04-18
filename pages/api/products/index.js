import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'GET') {

        try {
            const client = await MongoClient.connect(process.env.DB_HOST);

            const db = client.db();

            const listsCollection = db.collection('products');

            const result = await listsCollection.find().toArray();

            client.close();

            res.status(200).json({ products: result });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default handler;