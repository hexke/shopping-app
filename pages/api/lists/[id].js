import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            const client = await MongoClient.connect(process.env.DB_HOST);

            const db = client.db();

            const listsCollection = db.collection('lists');

            const result = await listsCollection.findOne({ _id: ObjectId(id) });

            client.close();

            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default handler;
