import axios from "axios";
const Tag = {
    list: (page = 1) => {
        return axios.get("/tags?page=" + page);
    },
    add: (title) => {
        return axios.post(
            "/tags",
            { title },
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("user.api_token"),
                },
            }
        );
    },
    showOne: (id) => {
        return axios.get("/tags/" + id);
    },
    edit: (title, id) => {
        return axios.put(
            "/tags/" + id,
            { title },
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("user.api_token"),
                },
            }
        );
    },
    remove: (id) => {
        return axios.delete("/tags/" + id, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token"),
            },
        });
    },
    listAll: () => {
        return axios.get('/tags?all=1');
    }
};
export default Tag;
