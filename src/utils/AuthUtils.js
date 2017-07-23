export function addTimestampToAuthData(authData = {}) {
    return Object.assign({}, authData, {
        ttl: authData.ttl * 1000,  // API is sending ttl in seconds
        timestamp: new Date().getTime()
    });
}
