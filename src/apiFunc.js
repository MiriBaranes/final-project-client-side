import axios from 'axios';

export const generalGetApi = async (url, navigate) => {
    try {
        return await axios.get(url);
    } catch (error) {
        navigate('/error');
        return null;  // Or you can throw an error if needed
    }
};
export const generalPostApi = async (url,obj, navigate) => {
    try {
        return await axios.post(url,obj,{
            headers
        });
    } catch (error) {
        navigate('/error');
        return null;  // Or you can throw an error if needed
    }
};

export const headers = {
    "Content-Type": "application/json",
};
export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
}
export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}
