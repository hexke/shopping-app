import { useContext } from "react";
import { AlertContext } from "../store/alerts-context";
import Alert from "./alert";
import { AnimatePresence } from "framer-motion";

const Alerts = () => {
    const alertCtx = useContext(AlertContext);

    const alerts = alertCtx.alerts;

    const removeAlertHandler = (id) => {
        alertCtx.removeAlert(id);
    };

    return (
        <div className="fixed top-2 right-2 z-10 max-w-xs w-full">
            <div>
                <AnimatePresence mode="sync">
                    {
                        alerts.map(alert =>
                            <Alert key={alert.id} message={alert.msg} ok={alert.ok} removeAlert={() => { removeAlertHandler(alert.id) }} />
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Alerts;