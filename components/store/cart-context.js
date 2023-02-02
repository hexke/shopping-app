import { createContext, useState } from "react";

export const CartContext = createContext({
    copiedItems: [],
    addToCopiedItems: (id) => { },
    removeFromCopiedItems: (id) => { },
});

const CartContextProvider = (props) => {
    const [copiedItems, setcopiedItems] = useState([]);

    const addToCopiedItems = (id) => {
        if (copiedItems.indexOf(id) > -1) return;
        setcopiedItems(prev => [...prev, id]);
    };

    const removeFromCopiedItems = (id) => {
        if (!copiedItems.indexOf(id) < 0) return;
        setcopiedItems(prev => prev.filter(item => item !== id));
    };

    const contextValue = {
        copiedItems: copiedItems,
        addToCopiedItems: addToCopiedItems,
        removeFromCopiedItems, removeFromCopiedItems
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;