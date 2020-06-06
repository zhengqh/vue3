import cookie from 'js-cookie'

const adminToKen = "admin_token";
const usernameKey = "username";

export function getToken() {
    return cookie.get(adminToKen)
}

export function setToken(token) {
    return cookie.set(adminToKen, token)
}

export function removeToken(){
    return cookie.remove(adminToKen)
}

export function getUsername() {
    return cookie.get(usernameKey)
}

export function setUsername(username) {
    return cookie.set(usernameKey, username)
}

export function removeUsername(){
    return cookie.remove(usernameKey)
}