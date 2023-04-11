import {request} from "@/network/request"

export function login(username, password) {
    return request({
        url: '/campus/login',
        method: 'POST',
        data: {
            "account": username,
            "password": password,
            "type": 1
        }
    })
}

