import Container from "../../components/container";
import Product from "../../components/product/product";
import { MongoClient } from "mongodb";

const ProductListPage = (props) => {

    return (
        <Container>
            {
                props.products.map(product => <Product key={product.id} {...product} />)
            }
        </Container>
    );

}

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const listsCollection = db.collection('products');

    const products = await listsCollection.find().toArray();

    client.close();

    return {
        props: {
            products: products.map(product => ({
                id: product._id.toString(),
                name: product.name,
                calories: product.calories,
                fats: product.fats,
                saturatedFats: product.saturatedFats,
                carbohydrates: product.carbohydrates,
                sugars: product.sugars,
                protein: product.protein,
                salt: product.salt
            })),
        },
    };
}

export default ProductListPage;
