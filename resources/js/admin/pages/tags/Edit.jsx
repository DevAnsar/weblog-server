import { useEffect } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import TagForm from "../../components/Tags/Form";

import {
    handleTagTitle,
    editTag,
    showTag,
    setTagDefaults,
} from "../../store/actions/TagActions";

const EditPage = ({ showTag, setTagDefaults, tagsData, handleTitleChange ,editTag }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(tagsData)
        setTagDefaults();
        showTag(id);
    }, []);

    const titleChange = (e) => {
        handleTitleChange(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editTag(tagsData.tag.title, id, function () {
            handleTitleChange("");
            setTimeout(() => navigate("/tags"), 2000);
        });
    };

    return (
        <div className="flex flex-col min-h-full">
            <Breadcrumb />
            <div className="container mx-auto px-4 sm:px-8 max-w-md">
                <div className="py-8">
                    <form className="flex w-full" onSubmit={handleFormSubmit}>
                        <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
                            <div className="mb-5 text-base text-gray-800 dark:text-white">
                                ایجاد دسته
                            </div>
                            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                                <TagForm
                                    tagsData={tagsData}
                                    onChange={titleChange}
                                />
                                <div className="col-span-2 text-right">
                                    <button
                                        type="submit"
                                        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        ویرایش تگ
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
        tagsData: state.tag,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        editTag: (title, id, cb) => dispatch(editTag(title, id, cb)),
        showTag: (id) => dispatch(showTag(id)),
        setTagDefaults: () => dispatch(setTagDefaults()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
