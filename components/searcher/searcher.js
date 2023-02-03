import { useState, useCallback, useRef, useEffect } from "react";
import useFilter from "../../hooks/useFilter";

const Searcher = ({ elements, searchBy, mapFn }) => {
    const [focused, setFocused] = useState(false);
    const [firstInput, setFirstInput] = useState(true);
    const [query, setQuery] = useState("");
    const inputRef = useRef();
    const listRef = useRef();

    const { filteredElements, filterElements } = useFilter(elements);


    const focusHandler = useCallback(() => {
        setFocused(true);
        setFirstInput(true);
    }, []);

    const blurHandler = useCallback((e) => {
        if (e.target.closest(".searcher")) return;
        setFocused(false);
        setFirstInput(true);
    }, []);

    const inputHandler = useCallback((e) => {
        setQuery(inputRef.current.value);

        if (!firstInput) return;
        setFirstInput(false);
    }, []);

    const listClickHandler = useCallback(() => {
        inputRef.current.value = "";
        setFocused(false);
        setFirstInput(true);
    }, []);

    useEffect(() => {
        document.addEventListener("click", blurHandler);
        return () => {
            document.removeEventListener("click", blurHandler);
        }
    }, []);

    useEffect(() => {
        filterElements((element) => element[searchBy].includes(query));
    }, [query]);

    return (
        <div className="searcher flex-auto relative mr-2">
            <input type="text" ref={inputRef} className="border w-full p-1" onInput={inputHandler} onFocus={focusHandler} onBlur={blurHandler} placeholder="wsad" />
            {
                focused && !firstInput &&
                <ul ref={listRef} onClick={listClickHandler} className="absolute top-full bg-white border shadow-md w-full max-h-40 overflow-y-scroll">
                    {filteredElements.map(mapFn)}
                </ul>
            }
        </div>
    );
}

export default Searcher;