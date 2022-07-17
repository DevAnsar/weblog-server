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
    listCategories,
    setCategoryDefaults,
} from "../../store/actions/CategoryActions";

const IndexPage = ({ categoriesData, listCategories, setCategoryDefaults }) => {
    // console.log("categories:", categories);

    useEffect(() => {
        setCategoryDefaults();
        listCategories(1);
    }, []);
    return (
        <div className="flex flex-col">
            <Breadcrumb />

            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="px-5 py-5 flex justify-between">
                            <span className="text-gray-800 text-base">
                                دسته بندی ها
                            </span>
                            <Link to="/categories/add">
                                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                                    <span className="text-sm">ایجاد دسته</span>
                                    <PlusIcon className="w-4 " />
                                </button>
                            </Link>
                        </div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <SuccessAlert msg={categoriesData.success_message} />
                            <ErrorAlert msg={categoriesData.error_message} />
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
                                            عنوان
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            اسلاگ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriesData.categories.data
                                        ? categoriesData.categories.data.map(
                                              (item) => (
                                                  <CategoryTableRow
                                                      key={item.id}
                                                      category={item}
                                                  />
                                              )
                                          )
                                        : null}
                                </tbody>
                            </table>
                            
                            <Pagination
                                data={categoriesData.categories}
                                onclick={listCategories}
                            />
                            <Spinner show={categoriesData.list_spinner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryTableRow = ({ category }) => {
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {category.id}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {category.title}{" "}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="text-gray-900 whitespace-no-wrap">
                    {category.slug}
                </span>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-5">
                <Link
                    to={"/categories/edit/" + category.id}
                    className="text-indigo-600 hover:text-indigo-900"
                >
                    <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
                </Link>
                <a href="#" className="btn btn-danger btn-sm">
                    <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
                </a>
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => {
    return {
        categoriesData: state.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listCategories: (page) => dispatch(listCategories(page)),
        setCategoryDefaults: () => dispatch(setCategoryDefaults()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
