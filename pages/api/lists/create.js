import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            const client = await MongoClient.connect(process.env.DB_HOST);

            const db = client.db();

            const listsCollection = db.collection('lists');

            await listsCollection.insertOne(data);

            client.close();

            res.status(201).json({ message: 'Lista została dodana.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default handler;
