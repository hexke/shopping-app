import { useCallback, useState } from 'react';

const useFilter = (elements) => {
    const [filteredElements, setFilteredElements] = useState(elements);

    const filterElements = useCallback((filterFn) => {
        setFilteredElements(elements.filter(filterFn));
    }, []);

    return { filteredElements, filterElements };
};

export default useFilter;
