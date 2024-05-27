export const isDateAfterCurrentTime = (dateString) => {
    // Convert the date string to a Date object
    const givenDate = new Date(dateString);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the two dates
    return givenDate > currentDate;
};
export const isDate = (value) => {
    // const date = new Date(value);
    // return !isNaN(date.getTime());
    return Object.prototype.toString.call(value) === '[object Date]'
};
export const validEmail = (value)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(05\d{8}|0[2-9]\d{7})$/;
    return phoneRegex.test(phoneNumber);
};
export const isValidUsername= (username) => {
    return username.length>0;
}
export const isValidPassword= (password) => {
    return password.length>0;
}
export const isValidEventType = (type) =>{
    return type== '1' || type =='2' || type =='3';
}
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};