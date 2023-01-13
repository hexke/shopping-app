import { MongoClient, ObjectId } from "mongodb";


async function handler(req, res) {
    if (req.method === 'PUT') {
        const data = req.body;

        const client = await MongoClient.connect(process.env.DB_HOST);

        const db = client.db();

        const listsCollection = db.collection('lists');

        try {
            const result = await listsCollection.findOneAndUpdate({ _id: ObjectId(data.id) }, { $set: { "cart": data.cart } }, { new: true });

            res.status(201).json({ message: 'Lista zaktualizowana.' });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        client.close();
    }
}

export default handler;