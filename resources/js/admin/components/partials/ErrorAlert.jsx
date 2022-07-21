import React from "react";
const ErrorAlert = (props) => {
    return props.msg !== "" ? (
        <div className="bg-red-100 px-3 py-2 border border-red-600 text-red-600 text-smr my-2 w-full rounded-xl">{props.msg}</div>
    ) : null;
};
export default ErrorAlert;
