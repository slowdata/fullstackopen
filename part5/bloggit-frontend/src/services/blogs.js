import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
    try {
        const request = await axios.get(baseUrl);
        return await request.data;
    } catch (error) {
        console.error(error);
    }
};

export default { getAll };
