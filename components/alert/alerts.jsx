import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AlertContext } from '../store/alerts-context';
import Alert from './alert';

function Alerts() {
    const { alerts, removeAlert } = useContext(AlertContext);

    const removeAlertHandler = (id) => {
        removeAlert(id);
    };

    return (
        <div className="fixed top-2 right-2 z-10 max-w-xs w-full">
            <div>
                <AnimatePresence mode="sync">
                    {
                        alerts.map((alert) => (
                            <Alert
                                key={alert.id}
                                message={alert.msg}
                                ok={alert.ok}
                                removeAlert={() => { removeAlertHandler(alert.id); }}
                            />
                        ))
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Alerts;
