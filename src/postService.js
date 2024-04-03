import axios from "axios"
const postService = (formData) => {
    const url = "http://localhost:8000/vendor/addVendor";

    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
        params.append(pair[0], pair[1]);
    }
    const config = {
        headers: {
            'content-type': "application/x-www-form-urlencoded"
        }
    };
    return axios.post(url, params, config)
}
export default postService;