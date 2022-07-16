import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    ClipboardListIcon,
    ServerIcon,
    TagIcon,
    ChatAlt2Icon,
    KeyIcon,
} from "@heroicons/react/solid";

export const sidebarLinks = [
    {
        id: "1",
        title: "داشبورد",
        Icon: HomeIcon,
        link: "/",
    },
    {
        id: "2",
        title: "کاربران",
        Icon: UsersIcon,
        link: "/users",
    },
    {
        id: "3",
        title: "پست ها",
        Icon: ClipboardListIcon,
        link: "/posts",
    },
    {
        id: "4",
        title: "دسته بندی ها",
        Icon: ServerIcon,
        link: "/categories",
    },

    {
        id: "5",
        title: "تگ ها",
        Icon: TagIcon,
        link: "/tags",
    },

    {
        id: "6",
        title: "کامنت ها",
        Icon: ChatAlt2Icon,
        link: "/comments",
    },

    {
        id: "7",
        title: "صفحه ورود",
        Icon: KeyIcon,
        link: "/login",
    },
];

function Sidebar() {
    const [routs] = useState(sidebarLinks);
    const location = useLocation();
    return (
        <div
            id="sidebar"
            className={`h-screen hidden w-60 mt-20 hover:shadow-2xl transition-all ease-in-out delay-150 z-40 bg-white text-white pr-8 pl-4 fixed shadow ${
                location.pathname !== "/login" ? "lg:flex" : ""
            }`}
        >
            <ul className="list-reset w-full mt-7">
                {routs.map((route) => {
                    return (
                        <SideBarIem
                            key={route.id}
                            title={route.title}
                            link={route.link}
                            Icon={route.Icon}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export const SideBarIem = ({ title, link, Icon }) => {
    const location = useLocation();
    return (
        <li className="my-2 md:my-0 w-full">
            <Link
                to={link}
                className={`flex w-full items-center p-3 rounded-2xl text-gray-600 no-underline hover:text-indigo-400 hover:bg-slate-50 ${
                    location.pathname == link
                        ? "text-indigo-600 bg-slate-100"
                        : ""
                }`}
            >
                <Icon className="h-5 w-5" />
                <span className="text-sm lg:text-md mr-2">{title}</span>
            </Link>
        </li>
    );
};

export default Sidebar;
