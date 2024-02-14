export const generateSessionToken = () => {
    const randomString = Math.random().toString(36).substr(2, 4).toUpperCase();
    const timestampString = new Date().getTime().toString(36).toUpperCase();
    const uniqueId = randomString + timestampString;
    return uniqueId;
}