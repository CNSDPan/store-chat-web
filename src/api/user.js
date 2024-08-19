import request from '@/util/request.js'


export function userListInit(data) {
    return request({
        url: '/api/user/list',
        method: 'post',
        data
    })
}

export function userLogin(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

