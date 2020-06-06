import servic from '@/utils/request.js'

/**
 * 获取验证码
 */
export function GetSms(data) {
    return servic.request({
        method: 'post',
        url: '/getSms/',
        data: data
    })
}
/**
 * 登录
 */
export function Login(data) {
    return servic.request({
        method: 'post',
        url: '/login/',
        data
    })
}
/**
 * 注册
 */
export function Register(data) {
    return servic.request({
        method: 'post',
        url: '/register/',
        data
    })
}