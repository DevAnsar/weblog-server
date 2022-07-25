import { useEffect } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

import {
    listUsers,
    setUserDefaults,
    deleteUser,
} from "../../store/actions/UserActions";

const IndexPage = ({ usersData, listUsers, setUserDefaults, deleteUser }) => {
    useEffect(() => {
        setUserDefaults();
        listUsers(1);
    }, []);
    return (
        <div className="flex flex-col">
            <Breadcrumb />

            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="px-5 py-5 flex justify-between">
                            <span className="text-gray-800 text-base">
                                کاربران
                            </span>
                            <Link to="/users/add">
                                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                                    <span className="text-sm">ایجاد کاربر</span>
                                    <PlusIcon className="w-4 " />
                                </button>
                            </Link>
                        </div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <SuccessAlert msg={usersData.success_message} />
                            <ErrorAlert msg={usersData.error_message} />
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            آیدی
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            نام
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            ایمیل
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            ادمین
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            تاریخ عضویت
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.users.data
                                        ? usersData.users.data.map((item) => (
                                              <UserTableRow
                                                  deleteUser={deleteUser}
                                                  key={item.id}
                                                  user={item}
                                              />
                                          ))
                                        : null}
                                </tbody>
                            </table>

                            <Pagination
                                data={usersData.users}
                                onclick={listUsers}
                            />
                            <Spinner show={usersData.list_spinner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserTableRow = ({ user, deleteUser }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
            deleteUser(user.id);
        }
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.id}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.is_admin === 1 && (
                    <span className="text-green-600 text-sm bg-green-100 border-green-600 border-md px-2 py-1 whitespace-no-wrap rounded-lg">
                        ادمین
                    </span>
                )}

                {user.is_admin == !1 && (
                    <span className="text-gray-800 text-sm bg-gray-100 border-gray-600 border-md px-2 py-1  whitespace-no-wrap rounded-lg">
                        کاربر عادی
                    </span>
                )}
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="text-gray-900 whitespace-no-wrap">
                    {user.created_at}
                </span>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className=" flex items-center gap-5 w-full">
                    <Link
                        to={"/users/edit/" + user.id}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
                    </Link>
                    <a
                        href="#"
                        onClick={handleDelete}
                        className="btn btn-danger btn-sm"
                    >
                        <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
                    </a>
                </div>
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => {
    return {
        usersData: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listUsers: (page) => dispatch(listUsers(page)),
        setUserDefaults: () => dispatch(setUserDefaults()),
        deleteUser: (id) => dispatch(deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
