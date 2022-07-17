import { UserIcon, LogoutIcon, BellIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import Auth from "../../apis/Auth";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import UserLogoIcon from "../../../../assets/images/user-1.jpg";

const UserDataMenu = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        Auth.logout(
            (response) => {
                navigate("/login", { replace: true });
            },
            (err) => {
                alert(err.response.data.message);
            }
        );
    };
    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="w-full text-sm font-medium flex text-slate-100 items-center gap-2">
                        <img
                            alt="profil"
                            src={UserLogoIcon}
                            className="mx-auto object-cover rounded-full h-10 w-10 "
                        />
                        <p>{localStorage.getItem("user.name")}</p>
                    </Menu.Button>
                    
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-violet-50"
                                                : "text-gray-700"
                                        } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                                    >
                                        <UserIcon
                                            className={`ml-2  w-5 ${
                                                active
                                                    ? "text-violet-100"
                                                    : "text-violet-400"
                                            }`}
                                            aria-hidden="true"
                                        />
                                        پروفایل
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-violet-50"
                                                : "text-gray-700"
                                        } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                                    >
                                        <BellIcon
                                            className={`ml-2  w-5 ${
                                                active
                                                    ? "text-violet-100"
                                                    : "text-violet-400"
                                            }`}
                                            aria-hidden="true"
                                        />
                                        اطلاعیه ها
                                    </button>
                                )}
                            </Menu.Item>
                        </div>

                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`${
                                            active
                                                ? "bg-red-100 text-red-500"
                                                : "text-gray-700"
                                        } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                                    >
                                        <LogoutIcon
                                            className={`ml-2  w-5 ${
                                                active
                                                    ? "text-red-400"
                                                    : "text-violet-400"
                                            }`}
                                            aria-hidden="true"
                                        />
                                        خروج
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
export default UserDataMenu;
