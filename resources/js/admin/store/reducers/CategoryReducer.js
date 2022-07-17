import { LIST_CATEGORIES,
    LIST_CATEGORIES_SUCCESS,
    LIST_CATEGORIES_FAILURE,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAILURE,
    SHOW_CATEGORY,
    SHOW_CATEGORY_SUCCESS,
    SHOW_CATEGORY_FAILURE,
    EDIT_CATEGORIES,
    EDIT_CATEGORIES_SUCCESS,
    EDIT_CATEGORIES_FAILURE,
    DELETE_CATEGORIES,
    DELETE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILURE,
    SET_CATEGORY_DEFAULTS,
    HANDLE_CATEGORY_TITLE,
    LIST_ALL_CATEGORIES
} from '../actionTypes/CategoryTypes';

const initialState = {
    categories: {},        // used in listing page
    all_categories: [],    // used to fill dropdowns
    category: {
        id: "",
        title: "",
        slug: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const categoryReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORY_DEFAULTS:
            return {
                ...state,
                category: {...state.category},
                success_message: "",
                error_message: "",
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case HANDLE_CATEGORY_TITLE:
            return {
                ...state,
                category: {...state.category, title: action.data}
            };
        case LIST_CATEGORIES:
            return {
                ...state,
                list_spinner: true
            };
        case LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data,
                list_spinner: false
            };
        case LIST_CATEGORIES_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };
        case LIST_ALL_CATEGORIES:
            return {
                ...state,
                all_categories: action.data
            };
        case CREATE_CATEGORIES:
            return {
                ...state,
                create_update_spinner: true
            };
        case CREATE_CATEGORIES_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                category: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null
            };
        case CREATE_CATEGORIES_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case SHOW_CATEGORY:
            return {
                ...state,
                create_update_spinner: true
            };
        case SHOW_CATEGORY_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                category: action.data.data
            };
        case SHOW_CATEGORY_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message
            };
        case EDIT_CATEGORIES:
            return {
                ...state,
                create_update_spinner: true
            };
        case EDIT_CATEGORIES_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                category: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null
            };
        case EDIT_CATEGORIES_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case DELETE_CATEGORIES:
            return {
                ...state,
                list_spinner: true
            };
        case DELETE_CATEGORIES_SUCCESS:
            let cats = state.categories;
            cats.data = state.categories.data.filter(item => item.id != action.id);
            return {
                ...state,
                list_spinner: false,
                categories: cats,
                success_message: action.message,
                error_message: ''
            };
        case DELETE_CATEGORIES_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: ''
            };
        default:
            return state;
    }
};
export default categoryReducer;