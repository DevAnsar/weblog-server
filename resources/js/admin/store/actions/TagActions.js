import {
    SET_TAG_DEFAULTS,
    HANDLE_TAG_TITLE,
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
    CREATE_TAGS,
    CREATE_TAGS_SUCCESS,
    CREATE_TAGS_FAILURE,
} from "../actionTypes/TagTypes";

import Tag from "../../apis/Tag";

function handleTagTitle(title) {
    return function (dispatch, getState) {
        dispatch({
            type: HANDLE_TAG_TITLE,
            data: title,
        });
    };
}

function setTagDefaults() {
    return function (dispatch, getState) {
        dispatch({
            type: SET_TAG_DEFAULTS,
        });
    };
}

/**
 * list Tags action
 */
function listTags(page = 1) {
    return function (dispatch, getState) {
        dispatch({
            type: LIST_TAGS,
        });
        Tag.list(page)
            .then((response) => {
                dispatch({
                    type: LIST_TAGS_SUCCESS,
                    data: response.data.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: LIST_TAGS_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
 function listAllTags() {
    return function (dispatch, getState) {
        // async call
        Tag.listAll().then(response => {
            dispatch({
                type: TagTypes.LIST_ALL_TAGS,
                data: response.data.data
            });
        });
    }
}

/**
 * add category action
 */
function addTag(title, cb) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: CREATE_TAGS,
        });
        // async call must dispatch action whether on success or failure
        Tag.add(title)
            .then((response) => {
                dispatch({
                    type: CREATE_TAGS_SUCCESS,
                    data: response.data,
                });
                cb();
            })
            .catch((error) => {
                dispatch({
                    type: CREATE_TAGS_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * show Tag action
 */
function showTag(id) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: SHOW_TAGS,
        });
        // async call must dispatch action whether on success or failure
        Tag.showOne(id)
            .then((response) => {
                dispatch({
                    type: SHOW_TAGS_SUCCESS,
                    data: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: SHOW_TAGS_FAILURE,
                    error: error.response.data,
                });
            });
    };
}
/**
 * edit Tag action
 */
function editTag(title, id, cb) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: EDIT_TAGS,
        });
        // async call must dispatch action whether on success or failure
        Tag.edit(title, id)
            .then((response) => {
                dispatch({
                    type: EDIT_TAGS_SUCCESS,
                    data: response.data,
                });
                cb();
            })
            .catch((error) => {
                dispatch({
                    type: EDIT_TAGS_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * delete Tag action
 */
function deleteTag(id) {
    return function (dispatch, getState) {
        dispatch({
            type: DELETE_TAGS,
        });
        Tag.remove(id)
            .then((response) => {
                dispatch({
                    type: DELETE_TAGS_SUCCESS,
                    message: response.data.message,
                    id: id,
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_TAGS_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

export {
    listTags,
    setTagDefaults,
    handleTagTitle,
    deleteTag,
    showTag,
    editTag,
    addTag,
    listAllTags
};
