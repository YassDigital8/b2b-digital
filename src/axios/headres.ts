export const getHeadres = () => {
    const token = localStorage.getItem('token'); 
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};