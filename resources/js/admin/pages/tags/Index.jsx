import { useEffect } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

import {
    listTags,
    setTagDefaults,
    deleteTag,
} from "../../store/actions/TagActions";

const IndexPage = ({ tagsData, listTags, setTagDefaults, deleteTag }) => {
    useEffect(() => {
        setTagDefaults();
        listTags(1);
    }, []);

    return (
        <div className="flex flex-col">
            <Breadcrumb />
            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="px-5 py-5 flex justify-between">
                            <span className="text-gray-800 text-base">
                                تگ ها
                            </span>
                            <Link to="/tags/add">
                                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                                    <span className="text-sm">ایجاد تگ</span>
                                    <PlusIcon className="w-4 " />
                                </button>
                            </Link>
                        </div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <SuccessAlert msg={tagsData.success_message} />
                            <ErrorAlert msg={tagsData.error_message} />
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
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tagsData.tags.data
                                        ? tagsData.tags.data.map((item) => (
                                              <TagTableRow
                                                  deleteTag={deleteTag}
                                                  key={item.id}
                                                  tag={item}
                                              />
                                          ))
                                        : null}
                                </tbody>
                            </table>

                            <Pagination
                                data={tagsData.tags}
                                onclick={listTags}
                            />
                            <Spinner show={tagsData.list_spinner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagTableRow = ({ tag, deleteTag }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
            deleteTag(tag.id);
        }
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{tag.id}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{tag.title}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-5">
                <Link
                    to={"/tags/edit/" + tag.id}
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
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => {
    return {
        tagsData: state.tag,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listTags: (page) => dispatch(listTags(page)),
        setTagDefaults: () => dispatch(setTagDefaults()),
        deleteTag: (id) => dispatch(deleteTag(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
