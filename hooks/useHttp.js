import { useCallback } from "react";

const useHttp = () => {

    const sendRequest = useCallback(async (config, callback) => {
        try {
            const response = await fetch(config.url, {
                method: config.method ? config.method : "GET",
                body: config.body ? JSON.stringify(config.body) : null,
                headers: config.headers ? config.headers : {}
            });

            // if (!response.ok) {
            //     throw new Error("error...");
            // }

            const body = await response.json();

            callback(response.ok, body);

        } catch (error) {
            throw new Error(error);
        }
    }, []);

    return sendRequest;
};

export default useHttp;