import { useEffect } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams,useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Categories/Form";

import {
    handleCategoryTitle,
    editCategory,
    showCategory,
    setCategoryDefaults
} from "../../store/actions/CategoryActions";

const EditPage = ({ categoriesData, handleTitleChange ,editCategory,showCategory,setCategoryDefaults }) => {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        setCategoryDefaults();
        showCategory(id)
    },[]);

    const titleChange = (e) => {
        handleTitleChange(e.target.value);
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();

        
        editCategory(categoriesData.category.title,id, function () {
            // reset title
            handleTitleChange('');
            // redirect
            setTimeout(() => navigate('/categories'), 2000);
        });

    }

    return (
        <div className="flex flex-col">
            <Breadcrumb />
            <div className="container mx-auto px-4 sm:px-8 max-w-md">
                <div className="py-8">
                    <form className="flex w-full" onSubmit={handleFormSubmit}>
                        <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
                            <div className="mb-5 text-base text-gray-800 dark:text-white">
                                ایجاد دسته
                            </div>
                            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                                <CategoryForm
                                    categoriesData={categoriesData}
                                    onChange={titleChange}
                                />
                                <div className="col-span-2 text-right">
                                    <button
                                        type="submit"
                                        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        ویرایش دسته
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
        categoriesData: state.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleTitleChange: (title) => dispatch(handleCategoryTitle(title)),
        editCategory: (title, id, cb) => dispatch(editCategory(title, id, cb)),
        showCategory : (id)=>dispatch(showCategory(id)),
        setCategoryDefaults: () => dispatch(setCategoryDefaults())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
