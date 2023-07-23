import React from "react";
import { useState } from "react";

export default function ButtonForCounter() {
    const [count, setCount] = useState(0);

    function clickButton() {
        setCount((prevCount) => prevCount + 1);
    }

    return (
        <>
            <button onClick={clickButton}>increase counter</button>
            <h1>{count}</h1>
        </>
    );
}
