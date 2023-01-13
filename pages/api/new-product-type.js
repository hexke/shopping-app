import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db();

        const listsCollection = db.collection('productTypes');

        try {
            const result = await listsCollection.insertOne(data);

            res.status(201).json({ message: 'Dodano nowy typ produktów.', insertedId: result.insertedId });

        } catch (error) {
            res.status(500).json({ message: error });
        }

        client.close();
    }
}

export default handler;