import axios from 'axios';

const headers = {
    "Accept": "application/json",
    "Content-Type" : "application/json",
};

const baseUrl = 'http://localhost:5000/v1/';
export const get = (url) => {
    return axios.get(baseUrl + url, headers);
}

export const post = (url, data ) => {
    return axios.post(baseUrl + url, data, { headers: headers });
}

export const put = (url, data ) => {
    return axios.put(baseUrl + url, data, { headers: headers });
}

export const del = (url, data ) => {
    return axios.delete(baseUrl + url, data, { headers: headers });
}