import Axios from "axios";

function returnAxiosInstance() {
    return Axios.create();
}

export function get(url: string) {
    const axios = returnAxiosInstance();
    return axios.get(url);
}

export function post(url: string, requestData: any) {
    const axios = returnAxiosInstance();
    return axios.post(url, requestData);
}

export function put(url: string, requestData: any) {
    const axios = returnAxiosInstance();
    return axios.put(url, requestData);
}
export function delete_(url: string) {
    const axios = returnAxiosInstance();
    return axios.delete(url);
}