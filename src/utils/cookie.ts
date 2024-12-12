import Cookies from 'js-cookie';
export const setToken = (token: string) => {
    console.log(token)
    Cookies.set('token', token, { expires: 1, path: '' });
};

export const getToken = () => {
    return Cookies.get('token');
};

export const removeToken = () => {
    Cookies.remove('token');
};
