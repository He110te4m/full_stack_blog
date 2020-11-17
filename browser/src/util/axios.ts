import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000/',
    // baseURL: '/api/',
};

const service = axios.create(AXIOS_CONFIG);

function onRequest (config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
}

function onResponseSuccess (config: AxiosResponse): AxiosResponse<ApiReturn> {
    return config.data;
}

function onResponseFail (config: AxiosResponse): AxiosResponse<ApiReturn> {
    return config;
}

service.interceptors.request.use(
    onRequest,
);

service.interceptors.response.use(
    onResponseSuccess,
    onResponseFail
);

export default service;
