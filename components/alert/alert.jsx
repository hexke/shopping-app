import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

function Alert(props) {
    const { ok, removeAlert, message } = props;

    return (
        <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', duration: 0.3, x: { duration: 0.1 } }}
        >
            <div className={`bg-white shadow-md mt-2 rounded-md flex relative p-3 -z-2 ${ok ? 'bg-green-500' : 'bg-red-500'}`}>
                <p className="mr-auto pl-2 text-white">{message}</p>
                <button className="bg-gray-100 rounded-full w-6 h-6 grid place-items-center transition-all active:scale-90 hover:bg-black text-black hover:text-white" onClick={removeAlert} type="button">
                    <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

export default Alert;
