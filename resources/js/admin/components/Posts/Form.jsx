import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
    PlusIcon,
    ReplyIcon
} from "@heroicons/react/solid";

import Spinner from "../../components/partials/Spinner";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

const Form = ({
    post,
    handleFieldChange,
    create_update_spinner,
    success_message,
    error_message,
    handleCkeditorChange,
    all_categories,
    all_tags,
    openAddCategoryModal,
    openAddTagModal,
    handleSave,
    submitRef,
    validation_errors,
}) => {

    return (
        <div className="w-full">
            <Spinner show={create_update_spinner} />
            <SuccessAlert msg={success_message} />
            <ErrorAlert msg={error_message} />
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-8">
                    <div className=" bg-white rounded-2xl shadow dark:bg-gray-800 p-5">
                        <div className="flex justify-between mb-5">
                            <h3 className="box-title">
                                {post.id != ""
                                    ? "ویرایش پست #" + post.id
                                    : "افزودن پست جدید"}
                            </h3>
                            <Link
                                to="/posts"
                                className="px-3 py-1 rounded-lg bg-yellow-500 text-slate-50 text-sm"
                            >
                                <ReplyIcon className="w-5 " />
                            </Link>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center gap-5">
                                <label>عنوان</label>
                                <input
                                    type="text"
                                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="عنوان پست"
                                    onChange={handleFieldChange}
                                    value={post.title ? post.title : ""}
                                    name="title"
                                />
                                {validation_errors.title != null ? (
                                    <div className="help-block">
                                        {validation_errors.title[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex flex-col items-start gap-2 mt-5 w-full">
                                <label>متن پست</label>
                                <CKEditor
                                    className="w-full"
                                    name="content"
                                    editor={ClassicEditor}
                                    data={post.content ||""}
                                    onReady={(editor) => {
                                        //console.log(editor);
                                    }}
                                    onChange={handleCkeditorChange}
                                />
                                {validation_errors.content != null ? (
                                    <div className="help-block">
                                        {validation_errors.content[0]}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className=" bg-white rounded-2xl shadow dark:bg-gray-800 p-5">
                        <div className="box-body">
                            <div
                                className={`flex justify-between items-center gap-5 ${
                                    validation_errors.category_id
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <select
                                    name="category_id"
                                    id="category_id"
                                    className="rounded-lg border border-gary-700 text-sm px-3 py-1 w-full"
                                    onChange={handleFieldChange}
                                    value={post.category_id}
                                >
                                    <option value="">انتخاب دسته</option>
                                    {all_categories.map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.title}
                                            </option>
                                        );
                                    })}
                                </select>

                                <button
                                    type="button"
                                    className="px-3 py-1 rounded-lg bg-blue-500 text-slate-50 text-sm flex justify-between items-center"
                                    onClick={openAddCategoryModal}
                                >
                                    <PlusIcon className="w-4 " />
                                </button>
                            </div>
                            {validation_errors.category_id != null ? (
                                <div className="help-block">
                                    {validation_errors.category_id[0]}
                                </div>
                            ) : null}

                            <br />

                            <div className="flex flex-col items-start">
                                <label className="font-bold text-sm text-gray-800">
                                    تگ ها
                                </label>
                                <div className="flex flex-col mt-3">
                                    {all_tags.map((tag) => {
                                        return (
                                            <div
                                                className="checkbox"
                                                key={tag.id}
                                            >
                                                <label className="flex items-center gap-2 text-gray-800 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        name="tag[]"
                                                        value={tag.id}
                                                        onChange={
                                                            handleFieldChange
                                                        }
                                                        checked={post.tags.includes(
                                                            tag.id
                                                        )}
                                                    />
                                                    {tag.title}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    className="mt-3 px-3 py-1 rounded-lg bg-blue-500 text-slate-50 text-sm flex justify-between items-center"
                                    onClick={openAddTagModal}
                                >
                                    <PlusIcon className="w-4 " />
                                    افزودن تگ جدید
                                </button>
                            </div>

                            {post.image_url ? (
                                <img src={post.image_url} className="w-full mt-8" />
                            ) : null}
                            <div
                                className={`form-group mt-3 ${
                                    validation_errors.image ? "has-error" : ""
                                }`}
                            >
                                <label className="text-gray-800 text-sm">
                                    تصویر
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="mt-2 w-full rounded-lg border border-gray-800 text-sm"
                                    onChange={handleFieldChange}
                                    accept="image/*"
                                />
                                {validation_errors.image != null ? (
                                    <div className="help-block">
                                        {validation_errors.image[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <input
                                    type="button"
                                    name="savedraft"
                                    value="ذخیره پیشنویس"
                                    onClick={handleSave}
                                    className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer text-slate-500 text-sm flex justify-between items-center"
                                />

                                <input
                                    type="button"
                                    name="publish"
                                    value="انتشار"
                                    onClick={handleSave}
                                    className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer text-slate-50 text-sm flex justify-between items-center"
                                />
                                <input
                                    type="submit"
                                    ref={submitRef}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Form;
