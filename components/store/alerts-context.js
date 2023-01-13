import { createContext, useState } from "react";

export const AlertContext = createContext({
    alerts: [],
    addAlert: () => { },
    removeAlert: () => { },
});

const AlertContextProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlertHandler = (alert) => {
        setAlerts(prev => [...prev, alert] );
    };
    
    const removeAlertHandler = (id) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    const contextValue = {
        alerts: alerts,
        addAlert: addAlertHandler,
        removeAlert: removeAlertHandler
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;