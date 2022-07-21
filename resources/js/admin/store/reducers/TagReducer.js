import {
    HANDLE_TAG_TITLE,
    SET_TAG_DEFAULTS,
    LIST_TAGS,
    LIST_TAGS_SUCCESS,
    LIST_TAGS_FAILURE,
    DELETE_TAGS,
    DELETE_TAGS_SUCCESS,
    DELETE_TAGS_FAILURE,
    EDIT_TAGS,
    EDIT_TAGS_SUCCESS,
    EDIT_TAGS_FAILURE,
    SHOW_TAGS,
    SHOW_TAGS_SUCCESS,
    SHOW_TAGS_FAILURE,
    LIST_ALL_TAGS
} from "../actionTypes/TagTypes";

const initialState = {
    tags: {},
    all_tags: [],
    tag: {
        id: "",
        title: "",
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false,
};

const tagReducer = function (state = initialState, action) {
    switch (action.type) {
        case HANDLE_TAG_TITLE:
            return {
                ...state,
                tag: { ...state.tag, title: action.data },
            };
        case SET_TAG_DEFAULTS:
            return {
                ...state,
                tag: { ...state.tag },
                success_message: "",
                error_message: "",
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false,
            };

        case LIST_TAGS:
            return {
                ...state,
                list_spinner: true,
            };
        case LIST_TAGS_SUCCESS:
            return {
                ...state,
                tags: action.data,
                list_spinner: false,
            };
        case LIST_TAGS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false,
            };

        case DELETE_TAGS:
            return {
                ...state,
                list_spinner: true,
            };
        case DELETE_TAGS_SUCCESS:
            let tags = state.tags;
            tags.data = state.tags.data.filter((item) => item.id != action.id);
            return {
                ...state,
                list_spinner: false,
                tags: tags,
                success_message: action.message,
                error_message: "",
            };
        case DELETE_TAGS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: "",
            };

        case SHOW_TAGS:
            return {
                ...state,
                create_update_spinner: true,
            };
        case SHOW_TAGS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                tag: action.data.data,
            };
        case SHOW_TAGS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
            };

        case EDIT_TAGS:
            return {
                ...state,
                create_update_spinner: true,
            };
        case EDIT_TAGS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                tags: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null,
            };
        case EDIT_TAGS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: "",
            };

        case LIST_ALL_TAGS:
            return {
                ...state,
                all_tags: action.data,
            };

        default:
            return state;
    }
};

export default tagReducer;
