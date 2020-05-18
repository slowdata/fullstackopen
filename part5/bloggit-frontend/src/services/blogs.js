import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    try {
        const request = await axios.get(baseUrl);
        return request.data;
    } catch (error) {
        throw new Error("Error fetching blogs!");
    }
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.post(baseUrl, newBlog, config);
        return response.data;
    } catch (error) {}
};

export default { getAll, create, setToken };
