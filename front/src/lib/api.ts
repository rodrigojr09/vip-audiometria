import axios from "axios";

export default axios.create({
	withCredentials: true,
	baseURL: "http://localhost:7961/api",
});
