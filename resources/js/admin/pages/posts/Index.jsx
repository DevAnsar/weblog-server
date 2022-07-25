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
    listPosts,
    setPostDefaults,
    deletePost,
} from "../../store/actions/PostActions";

const IndexPage = ({ postsData, listPosts, setPostDefaults, deletePost }) => {
    useEffect(() => {
        setPostDefaults();
        listPosts(1);
    }, []);
    return (
        <div className="flex flex-col">
            <Breadcrumb />

            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="px-5 py-5 flex justify-between">
                            <span className="text-gray-800 text-base">
                                پست ها
                            </span>
                            <Link to="/posts/add">
                                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                                    <span className="text-sm">ایجاد پست</span>
                                    <PlusIcon className="w-4 " />
                                </button>
                            </Link>
                        </div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <SuccessAlert msg={postsData.success_message} />
                            <ErrorAlert msg={postsData.error_message} />
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
                                            تصویر
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            وضعیت
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            دسته بندی
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal"
                                        >
                                            نویسنده
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postsData.posts.data
                                        ? postsData.posts.data.map((item) => (
                                              <PostTableRow
                                                  deletePost={deletePost}
                                                  key={item.id}
                                                  post={item}
                                              />
                                          ))
                                        : null}
                                </tbody>
                            </table>

                            <Pagination
                                data={postsData.posts}
                                onclick={listPosts}
                            />
                            <Spinner show={postsData.list_spinner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostTableRow = ({ post, deletePost }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
            deletePost(post.id);
        }
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{post.id}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <img src={post.image_url} className="w-14 rounded-sm" />
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {post.published === 1 && (
                    <span className="text-green-600 text-sm bg-green-100 border-green-600 border-md px-2 py-1 whitespace-no-wrap rounded-lg">
                        منشر شده
                    </span>
                )}

                {post.published === 2 && (
                    <span className="text-gray-800 text-sm bg-gray-100 border-gray-600 border-md px-2 py-1  whitespace-no-wrap rounded-lg">
                        پیش نویس
                    </span>
                )}
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="text-gray-900 whitespace-no-wrap">
                    {post.category.title}
                </span>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="text-gray-900 whitespace-no-wrap">
                    {post.user.name}
                </span>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className=" flex items-center gap-5 w-full">
                    <Link
                        to={"/posts/edit/" + post.id}
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
        postsData: state.post,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listPosts: (page) => dispatch(listPosts(page)),
        setPostDefaults: () => dispatch(setPostDefaults()),
        deletePost: (id) => dispatch(deletePost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
