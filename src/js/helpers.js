import { TIMEOUT_SEC } from "./config.js";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        console.log(res);

        if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);

        const data = await res.json();
        console.log(data);


        return data;

    } catch (err) {
        // console.error(err);
        throw err.message;
    }
};