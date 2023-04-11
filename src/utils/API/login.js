import axiosInstance from "../axiosInstance";
import adminInfo from "@/utils/API/adminInfo";

const login = {
    login({admin, pwd}) {
        axiosInstance.post("/login", {
            admin, pwd
        });
    }
}    //导出本对象
export default login;