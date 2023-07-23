// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";

export default function GetApi() {
    const [dataFromApi, setDataFromApi] = useState("");

    useEffect(() => {
        getData().then((data) => {
            setDataFromApi(data || "No data");
        });
    }, []);

    async function getData() {
        let data = await fetch("https://randomuser.me/api", {});

        //make data readable by converting it to json
        let jsonData = await data.json();

        let dataStringy = JSON.stringify(jsonData, null, 2);

        console.log(dataStringy);

        //print the data as a json object
        return JSON.stringify(jsonData, null, 2);
    }

    return (
        <>
            <pre>
                <code>{dataFromApi}</code>
            </pre>
        </>
    );
}
