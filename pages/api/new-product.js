import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(process.env.DB_HOST);
        const db = client.db();

        const listsCollection = db.collection('products');

        try {
            const result = await listsCollection.insertOne(data);

            res.status(201).json({ message: 'Produkt został dodany.' });

        } catch (error) {
            res.status(500).json({ message: 'Wystąpił błąd podczas dodawania produktu.' });
        }

        client.close();
    }
}

export default handler;