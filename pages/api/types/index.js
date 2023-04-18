import { MongoClient } from "mongodb";


async function handler(req, res) {
    if (req.method === 'GET') {

        try{

            const client = await MongoClient.connect(process.env.DB_HOST);
            
            const db = client.db();

            const typesCollection = db.Collection('productTypes');

            const result = await typesCollection.find().toArray();
            
            client.close();
            
            res.send(201).json({ types: result });
        } catch(error){
            res.status(500).json({ message: error.message });
        }

    }
}

export default handler;