import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext({
    copiedItems: [],
    addToCopiedItems: () => { },
    removeFromCopiedItems: () => { },
});

function CartContextProvider({ children }) {
    const [copiedItems, setcopiedItems] = useState([]);

    const addToCopiedItems = (id) => {
        if (copiedItems.indexOf(id) > -1) return;
        setcopiedItems((prev) => [...prev, id]);
    };

    const removeFromCopiedItems = (id) => {
        if (!copiedItems.indexOf(id) < 0) return;
        setcopiedItems((prev) => prev.filter((item) => item !== id));
    };

    const contextValue = useMemo({
        copiedItems,
        addToCopiedItems,
        removeFromCopiedItems,
    });

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
