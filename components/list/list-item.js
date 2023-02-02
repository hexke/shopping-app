import { motion } from "framer-motion";
import { useState } from "react";

const ListItem = (props) => {
    const [checked, setChecked] = useState(props.checked);

    const clickHandler = () => {
        if (checked) {
            props.uncheck(props._id);
        } else {
            props.check(props._id);
        }
        setChecked(prev => !prev);
    }

    return (
        <motion.div
            className="mb-2 last:mb-0 gap-2 bg-slate-50"
            layout
            initial={{ scale: 0.9, opacity: 0, y: "10%" }}
            animate={{ scale: 1, opacity: 1, y: "0%" }}
            exit={{ scale: 0.9, opacity: 0, x: "10%" }}
            transition={{ type: "spring", duration: 0.5, x: { duration: 0.1 } }}>
            <div className="flex p-1.5">
                <p className="w-10 items-center justify-center text-cyan-400 flex flex-col text-xl font-semibold border-r border-cyan-400 mr-3">
                    <span>{props.index + 1}</span>
                    <input type="checkbox" className=" accent-cyan-400 text-white" checked={props.checked} onClick={clickHandler} />
                </p>
                <p className="grow"><strong>{props.name}</strong><br />ilość: {props.amount}</p>
            </div>
        </motion.div>
    );
};

export default ListItem;