import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// partials
import UserForm from "./../../components/Users/Form";
import Breadcrumb from "../../components/Breadcrumb";

// actions
import {
    handleUserChange,
    addUser,
    setUserDefaults,
    resetUserFields,
} from "../../store/actions/UserActions";

const AddPage = ({
    usersData,
    handleUserChange,
    addUser,
    setUserDefaults,
    resetUserFields,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        setUserDefaults();
        resetUserFields();
    }, []);

    const handleUserChangeFn = (e) => {
        if (e.target.name == "is_admin") {
            handleUserChange(e.target.name, e.target.value, e.target.checked);
        } else {
            handleUserChange(e.target.name, e.target.value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addUser(usersData.user, function () {
            // reset fields
            resetUserFields();
            // redirect
            setTimeout(() => navigate("/users"), 2000);
        });
    };

    return (
        <div className="flex flex-col">
            <Breadcrumb />
            <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
                <div className="py-8">
                    <form className="flex w-full" onSubmit={handleFormSubmit}>
                        <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
                            <div className="mb-5 text-base text-gray-800 dark:text-white">
                                ایجاد کاربر جدید
                            </div>
                            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                                <UserForm
                                    user={usersData.user}
                                    create_update_spinner={usersData.create_update_spinner}
                                    success_message={usersData.success_message}
                                    error_message={usersData.error_message}
                                    handleUserChange={handleUserChangeFn}
                                    validation_errors={usersData.validation_errors}
                                />
                                <div className="col-span-2 text-right">
                                    <button
                                        type="submit"
                                        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        ثبت کاربر جدید
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        usersData: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleUserChange: (field, value, checked = null) =>
            dispatch(handleUserChange(field, value, checked)),
        addUser: (payload, cb) => dispatch(addUser(payload, cb)),
        setUserDefaults: () => dispatch(setUserDefaults()),
        resetUserFields: () => dispatch(resetUserFields()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPage);
