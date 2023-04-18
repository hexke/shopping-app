import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            const client = await MongoClient.connect(process.env.DB_HOST);

            const db = client.db();

            const listsCollection = db.collection('products');

            const result = await listsCollection.insertOne(data);

            client.close();

            if (result.ok) {
                res.status(201).json({ message: 'Produkt został dodany.' });
            } else {
                res.status(500).json({ message: 'Błąd.' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Wystąpił błąd podczas dodawania produktu.' });
        }
    }
}

export default handler;