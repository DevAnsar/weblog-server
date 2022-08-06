import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { PlusIcon, ReplyIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

export const CKEDITOR_OPTIONS = {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    toolbar: {
        items: [
            "exportPDF",
            "exportWord",
            "|",
            "findAndReplace",
            "selectAll",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "code",
            "subscript",
            "superscript",
            "removeFormat",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
            "|",
            "undo",
            "redo",
            "-",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "alignment",
            "|",
            "link",
            "insertImage",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "codeBlock",
            "htmlEmbed",
            "|",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "|",
            "textPartLanguage",
            "|",
            "sourceEditing",
        ],
        shouldNotGroupWhenFull: true,
    },
    // Changing the language of the interface requires loading the language file using the <script> tag.
    language: "en",
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true,
        },
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    heading: {
        options: [
            {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
            },
            {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
            },
            {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
            },
            {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
            },
            {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
            },
            {
                model: "heading5",
                view: "h5",
                title: "Heading 5",
                class: "ck-heading_heading5",
            },
            {
                model: "heading6",
                view: "h6",
                title: "Heading 6",
                class: "ck-heading_heading6",
            },
        ],
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    placeholder: "",
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    fontFamily: {
        options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
        ],
        supportAllValues: true,
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
    },
    // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
            },
        ],
    },
    // Be careful with enabling previews
    // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    htmlEmbed: {
        showPreviews: true,
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
            toggleDownloadable: {
                mode: "manual",
                label: "Downloadable",
                attributes: {
                    download: "file",
                },
            },
        },
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    mention: {
        feeds: [
            {
                marker: "@",
                feed: [
                    "@apple",
                    "@bears",
                    "@brownie",
                    "@cake",
                    "@cake",
                    "@candy",
                    "@canes",
                    "@chocolate",
                    "@cookie",
                    "@cotton",
                    "@cream",
                    "@cupcake",
                    "@danish",
                    "@donut",
                    "@dragée",
                    "@fruitcake",
                    "@gingerbread",
                    "@gummi",
                    "@ice",
                    "@jelly-o",
                    "@liquorice",
                    "@macaroon",
                    "@marzipan",
                    "@oat",
                    "@pie",
                    "@plum",
                    "@pudding",
                    "@sesame",
                    "@snaps",
                    "@soufflé",
                    "@sugar",
                    "@sweet",
                    "@topping",
                    "@wafer",
                ],
                minimumCharacters: 1,
            },
        ],
    },
    // The "super-build" contains more premium features that require additional configuration, disable them below.
    // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
    removePlugins: [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        "CKBox",
        "CKFinder",
        "EasyImage",
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        // 'Base64UploadAdapter',
        "RealTimeCollaborativeComments",
        "RealTimeCollaborativeTrackChanges",
        "RealTimeCollaborativeRevisionHistory",
        "PresenceList",
        "Comments",
        "TrackChanges",
        "TrackChangesData",
        "RevisionHistory",
        "Pagination",
        "WProofreader",
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType
        "MathType",
    ],
};
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
    useEffect(() => {
        CKEDITOR.ClassicEditor.create(
            document.getElementById("editor"),
            CKEDITOR_OPTIONS
        ).then((editor) => {
            console.log(editor)
            editor.setData(post.content || "");
            // console.log(editor);
            editor.model.document.on("change:data", () => {
                console.log(editor ? editor.getData() : undefined);
                handleCkeditorChange(editor);
            });
        }).catch(err=>{
            console.log("ckeditor has error:",err)
        });
    }, []);
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
                                <div id="editor"></div>

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
                                <img
                                    src={post.image_url}
                                    className="w-full mt-8"
                                />
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
