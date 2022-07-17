import React from "react";
import { RefreshIcon } from "@heroicons/react/solid";
const Spinner = (props) => {
    return props.show ? (
        <div className="overlay w-full py-5 flex justify-center items-center">
            <RefreshIcon className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
    ) : null;
};
export default Spinner;
