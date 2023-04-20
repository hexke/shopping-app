import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function List(props) {
    const date = new Date(props.timestamp).toLocaleString();

    return (
        <div className="bg-white shadow-md rounded-md p-7 border flex flex-col max-w-3xl w-full hover:shadow-xl mx-auto mb-7 last:mb-0">
            <p className="text-lg font-medium">{props.name}</p>
            <p className="text-sm font-sans font-semibold text-gray-400 mb-10">{date}</p>
            <Link href={`/lists/${props.id}`} className="border py-1.5 px-5 rounded-xl flex justify-center w-max items-center border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white transition-colors duration-300 self-end group">
                więcej
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-500" />
            </Link>
        </div>
    );
}

export default List;
