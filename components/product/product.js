import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import isBlank from '../../utils/isBlank';

const Product = (props) => {
    return (
        <div className="mx-auto mb-3 last:mb-0 max-w-3xl bg-white shadow-md p-5 rounded-md border hover:shadow-lg">
            <div className="flex border-b text-fuchsia-800 uppercase text-lg mb-2 pb-1 justify-between px-1">
                <p>{props.name} </p>
                <Link href={`/products/${props.id}`} className="group"><FontAwesomeIcon icon={faEdit} className="group-hover:text-cyan-400 w-4 h-4" /></Link>
            </div>
            <table className="w-full text-center border-collapse">
                <thead>
                    <tr>
                        <th className="text-sm font-normal">Kalorie</th>
                        <th className="text-sm font-normal">tłuszcze</th>
                        <th className="text-sm font-normal">w tym nasycone</th>
                        <th className="text-sm font-normal">węglowodany</th>
                        <th className="text-sm font-normal">cukry</th>
                        <th className="text-sm font-normal">białko</th>
                        <th className="text-sm font-normal">sól</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-sm">{isBlank(props.calories) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.fats) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.saturatedFats) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.carbohydrates) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.sugars) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.protein) ? '-' : props.calories}</td>
                        <td className="text-sm">{isBlank(props.salt) ? '-' : props.salt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Product;