import { MongoClient, ObjectId } from "mongodb";


const ProductDetailsPage = (props) => {
    return (
        <div>{props.productData.id}::{props.productData.name}</div>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const productsCollection = db.collection('products');

    const products = await productsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: products.map(product => ({ params: { productId: product._id.toString() } }))
    };
}

export async function getStaticProps(context) {
    const productId = context.params.productId;

    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const productsCollection = db.collection('products');

    const product = await productsCollection.findOne({ _id: ObjectId(productId) });

    client.close();

    return {
        props: {
            productData: {
                id: product._id.toString(),
                name: product.name,
            },
        }
    }
}

export default ProductDetailsPage;