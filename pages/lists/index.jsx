import { MongoClient } from 'mongodb';
import List from '../../components/list/list';
import Container from '../../components/container';

function ListsPage(props) {
    return (
        <Container>
            {props.lists.map((list) => <List key={list.id} {...list} />)}
        </Container>
    );
}

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const listsCollection = db.collection('lists');

    const lists = await listsCollection.find().toArray();

    client.close();

    return {
        props: {
            lists: lists.map((list) => ({
                id: list._id.toString(),
                name: list.name,
                timestamp: list.timestamp,
            })),
        },
    };
}

export default ListsPage;
