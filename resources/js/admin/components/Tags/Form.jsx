import Spinner from "../../components/partials/Spinner";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

const Form = ({ tagsData, onChange }) => {
    return (
        <div className="col-span-2 lg:col-span-2">
            <Spinner show={tagsData.create_update_spinner} />
            <SuccessAlert msg={tagsData.success_message} />
            <ErrorAlert msg={tagsData.error_message} />
            <div className=" relative ">
                <input
                    name="title"
                    value={
                        tagsData.tag.title
                            ? tagsData.tag.title
                            : ""
                    }
                    type="text"
                    id="contact-form-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="عنوان تگ"
                    onChange={onChange}
                />
                {tagsData.validation_errors != null ? (
                    <div className="help-block">
                        {tagsData.validation_errors.title[0]}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
export default Form;
