import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'PUT') {
        const data = req.body;

        try {
            const client = await MongoClient.connect(process.env.DB_HOST);

            const db = client.db();

            const listsCollection = db.collection('lists');

            const result = await listsCollection.findOneAndUpdate(
                { _id: ObjectId(data.id) },
                { $set: { cart: data.cart } },
                { new: true },
            );

            client.close();

            if (result.ok) {
                res.status(201).json({ message: 'Lista zaktualizowana.' });
            } else {
                res.status(500).json({ message: 'Unknown error' });
            }
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default handler;
