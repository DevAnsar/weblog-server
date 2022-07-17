import React from "react";
import {ChevronLeftIcon,ChevronRightIcon} from "@heroicons/react/solid";
import { connect } from "react-redux";

const Pagination = (props) => {
    // console.log(props)
    const num_pages = props.data.last_page;
    let pages = [];
    for (let page = 1; page <= num_pages; page++) {
        pages.push(
            <PaginationItem
                key={page}
                active={props.data.current_page == page}
                page={page}
                title={page}
                show={true}
                onclick={props.onclick}
            />
        );
    }

    return props.data && props.data.total > props.data.per_page ? (
        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="flex items-center">
                {/* <PaginationItem
                    active={props.data.current_page == 1}
                    page="1"
                    title="اولین"
                    show={props.data.current_page > 1}
                    onclick={props.onclick}
                ></PaginationItem> */}
                <PaginationItem
                    active={false}
                    title=""
                    page={props.data.current_page - 1}
                    show={props.data.current_page > 1}
                    onclick={props.onclick}
                    className="border rounded-r-xl"
                >
                    <ChevronRightIcon className="w-5" />
                </PaginationItem>
                {pages}
                <PaginationItem
                    active={false}
                    title=""
                    page={props.data.current_page + 1}
                    show={props.data.current_page < props.data.last_page}
                    onclick={props.onclick}
                    className="border-l  rounded-l-xl"
                >
                    <ChevronLeftIcon className="w-5" />
                </PaginationItem>
                {/* <PaginationItem
                    active={props.data.current_page == props.data.last_page}
                    page={props.data.last_page}
                    title="آخرین"
                    show={props.data.current_page < props.data.last_page}
                    onclick={props.onclick}
                /> */}
            </div>
        </div>
    ) : null;
};

const PaginationItem = ({ page, onclick, active, title, show,className, children }) => {
    const paginate = (e) => {
        e.preventDefault();
        onclick(page);
    };

    return show ? (
        <button
            type="button"
            onClick={paginate}
            className={`${
                active ? "text-indigo-500 bg-gray-200" : ""
            } ${className} w-full h-full px-4 py-2 border-t border-b text-base text-gray-500 bg-white hover:bg-gray-100`}
        >
            {title}
            {children}
        </button>
    ) : null;
};

export default Pagination;
