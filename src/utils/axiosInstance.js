/**
 * 这个文件专门用来配置axios
 * axios用于发起请求
 */
import axios from "axios";
const axiosInstance = axios.create({
    baseURL:"http://localhost:8080",
    // baseURL:"http://www.softeem.xin:9999",
    timeout:5000,
});
//后期设置拦截器
export default axiosInstance;