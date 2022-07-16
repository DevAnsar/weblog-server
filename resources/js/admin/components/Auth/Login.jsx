import React, { useState, useEffect, Component } from "react";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Auth from "../../apis/Auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error_message, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("skin-green");
        document.body.classList.add("login-page");
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMessage(null);
        setErrors(null);

        if (email == "" || password == "") {
            setErrorMessage("Please enter login credentials");
            return false;
        }
        Auth.login(
            { email, password },
            (response) => {
                if (response.data.user.is_admin == 1) {
                    for (var i in response.data.user) {
                        localStorage.setItem(
                            "user." + i,
                            response.data.user[i]
                        );
                        setTimeout(() => {
                            navigate("/", { replace: true });
                        }, 500);
                    }
                } else {
                    localStorage.clear();
                    setErrorMessage("Unauthorized");
                }
            },
            (err) => {
                console.log(err);
                setErrorMessage(err.response.data.message);
                setErrors(err.response.data.errors);
            }
        );
    };

    return (
        <div className="flex justify-center pt-20">
            <div className="p-5 bg-white border border-slate-400 rounded-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="text-center text-gray-800 text-base mb-5">
                    ورود به پنل مدیریت
                </div>
                <div className="login-box-body">
                <div className="mb-3">
                        {error_message ? (
                            <div className="bg-red-200 text-red-500 border border-red-400 rounded text-sm px-3 py-1 mb-3">
                                {error_message}
                            </div>
                        ) : null}
                    </div>
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <div
                            className={`flex flex-col ${
                                errors && errors.email ? "has-error" : ""
                            }`}
                        >
                            <div className="flex gap-3 items-center">
                                <AtSymbolIcon className="w-8 h-8 text-blue-500" />
                                <input
                                    className="bg-white border text-gray-700 text-base border-gray-400 rounded-2xl py-2 px-4 w-full"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleEmail}
                                    value={email}
                                />
                            </div>
                            {errors && errors.email ? (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.email[0]}
                                </div>
                            ) : null}
                        </div>

                        <div
                            className={`flex flex-col ${
                                errors && errors.password ? "has-error" : ""
                            }`}
                        >
                            <div className="flex gap-3 items-center">
                                <KeyIcon className="w-8 h-8 text-blue-500" />
                                <input
                                    className="bg-white border text-gray-700 text-base border-gray-400 rounded-2xl py-2 px-4 w-full"
                                    type="password"
                                    name="password"
                                    placeholder="رمز عبور"
                                    onChange={handlePassword}
                                    value={password}
                                />
                            </div>
                            {errors && errors.password ? (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.password[0]}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <button
                                type="submit"
                                className="rounded-2xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-2/4"
                            >
                                ورود
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
