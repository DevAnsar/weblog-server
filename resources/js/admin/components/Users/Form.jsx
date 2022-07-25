import Spinner from "../../components/partials/Spinner";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

const Form = ({
    user,
    handleUserChange,
    create_update_spinner,
    success_message,
    error_message,
    validation_errors,
}) => {
    return (
        <div className="col-span-2 lg:col-span-2">
            <Spinner show={create_update_spinner} />
            <SuccessAlert msg={success_message} />
            <ErrorAlert msg={error_message} />
            <div className="flex flex-col gap-5">
                <div className="">
                    <input
                        name="name"
                        value={user.name || ""}
                        type="text"
                        id="contact-form-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="نام کاربر"
                        onChange={handleUserChange}
                    />
                    {validation_errors.name != null ? (
                        <div className="help-block">
                            {validation_errors.name[0]}
                        </div>
                    ) : null}
                </div>

                <div className="">
                    <input
                        name="email"
                        value={user.email || ""}
                        type="email"
                        id="contact-form-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="ایمیل کاربر"
                        onChange={handleUserChange}
                    />
                    {validation_errors.email != null ? (
                        <div className="help-block">
                            {validation_errors.email[0]}
                        </div>
                    ) : null}
                </div>

                <div className="">
                    <input
                        name="password"
                        value={user.password || ""}
                        type="text"
                        id="contact-form-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="رمز عبور کاربر"
                        onChange={handleUserChange}
                    />
                    {validation_errors.password != null ? (
                        <div className="help-block">
                            {validation_errors.password[0]}
                        </div>
                    ) : null}
                </div>

                <div className="">
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleUserChange}
                            value="1"
                            checked={user.is_admin == 1}
                            name="is_admin"
                        />
                        ادمین
                    </label>
                    {validation_errors.is_admin != null ? (
                        <div className="help-block">
                            {validation_errors.is_admin[0]}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
export default Form;
