import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    res => {
        const code = res.data.code || 200;
        const msg = res.data.msg
        if (code === 401) {
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            return Promise.reject('error')
        } else if (code !== 200) {
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.warn('未授权，请重新登录');
                    window.location.href = '/login';
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error('其他错误', error.response.data.message);
            }
        }
        return Promise.reject(error);
    }
)

// 自定义上传文件
export const postFile = (url: string, data?: any) =>{
    return service.post(url, data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer', // 获取二进制数据
    })
}

export const get = (url: string, params?: any) => {
    return service.get(url, {params})
}
export const post = (url: string, data?: any) => {
    return service.post(url, data)
}
