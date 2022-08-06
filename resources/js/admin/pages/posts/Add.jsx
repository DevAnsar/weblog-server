import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// partials
import AddCategoryModal from "../../components/Categories/AddModal";
import AddTagModal from "../../components/Tags/AddModal";
import PostForm from "./../../components/Posts/Form";
import Breadcrumb from "../../components/partials/Breadcrumb";

// actions
import { listAllCategories } from "../../store/actions/CategoryActions";
import { listAllTags } from "../../store/actions/TagActions";
import {
    handleFieldChange,
    addPost,
    setPostDefaults,
    resetFields,
} from "../../store/actions/PostActions";

const AddPage = ({
    resetFields,
    handleFieldChange,
    postsData,
    addPost,
    setPostDefaults,
    listAllCategories,
    listAllTags,
    all_categories,
    all_tags,
}) => {
    const navigate = useNavigate();

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddTagModal, setShowAddTagModal] = useState(false);

    const submitRef = useRef();

    useEffect(() => {
        setPostDefaults();
        resetFields();
        listAllCategories();
        listAllTags();
    }, []);

    const openAddCategoryModal = () => {
        setShowAddCategoryModal(true);
    };
    const closeAddCategoryModal = () => {
        setShowAddCategoryModal(false);
    };

    const openAddTagModal = () => {
        setShowAddTagModal(true);
    };
    const closeAddTagModal = () => {
        setShowAddTagModal(false);
    };

    const handleFieldChangeFn = (e) => {
        if (e.target.name == "tag[]") {
            handleFieldChange(e.target.name, e.target.value, e.target.checked);
        } else if (e.target.name == "image") {
            handleFieldChange(e.target.name, e.target.files[0]);
        } else {
            handleFieldChange(e.target.name, e.target.value);
        }
    };
    const handleCkeditorChange = (editor) => {
        if (editor) {
            handleFieldChange("content", editor.getData());
        }else{
            console.log("editor is undefined!",editor);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPost(postsData.post, function () {
            // reset title
            resetFields();
            // redirect
            setTimeout(() => navigate("/posts"), 2000);
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        handleFieldChange("published", e.target.name == "publish" ? 1 : 2);
        setTimeout(() => submitRef.current.click(), 200);
    };

    return (
        <div className="flex flex-col min-h-full">
            <Breadcrumb />
            <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
                <div className="py-8">
                    <form className="flex w-full" onSubmit={handleFormSubmit}>
                        <div className="w-full px-5 py-5 m-auto">
                            <PostForm
                                post={postsData.post}
                                handleFieldChange={handleFieldChangeFn}
                                create_update_spinner={
                                    postsData.create_update_spinner
                                }
                                success_message={postsData.success_message}
                                error_message={postsData.error_message}
                                handleCkeditorChange={(editor) =>
                                    handleCkeditorChange(editor)
                                }
                                all_categories={all_categories}
                                all_tags={all_tags}
                                openAddCategoryModal={openAddCategoryModal}
                                openAddTagModal={openAddTagModal}
                                handleSave={handleSave}
                                submitRef={submitRef}
                                validation_errors={postsData.validation_errors}
                            />
                        </div>
                    </form>
                </div>
            </div>

            <AddCategoryModal
                showModal={showAddCategoryModal}
                onCloseModal={closeAddCategoryModal}
            />
            <AddTagModal
                showModal={showAddTagModal}
                onCloseModal={closeAddTagModal}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        postsData: state.post,
        all_categories: state.category.all_categories,
        all_tags: state.tag.all_tags,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFieldChange: (field, value, checked = null) =>
            dispatch(handleFieldChange(field, value, checked)),
        addPost: (postData, cb) => dispatch(addPost(postData, cb)),
        setPostDefaults: () => dispatch(setPostDefaults()),
        listAllCategories: () => dispatch(listAllCategories()),
        listAllTags: () => dispatch(listAllTags()),
        resetFields: () => dispatch(resetFields()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPage);
