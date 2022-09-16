import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerproject-ba62f-default-rtdb.firebaseio.com"
});

export default instance;