import axios from '@/request'
const url = 'http://edu.aodianyun.com/company/teacher'

//获取师生列表
export const getAccountList = (payload = {}) => {
    return axios.post(url + '/getAccountList', payload)
}

//添加师生
export const addAccount = (payload = {}) => {
    return axios.post(url + '/addAccount', payload)
}

//更新师生状态
export const updateStatus = (payload = {}) => {
    return axios.post(url + '/updateStatus', payload)
}

//重置密码
export const updatePassword = (payload = {}) => {
    return axios.post(url + '/updatePassword', payload)
}

//修改权限
export const updatePower = (payload = {}) => {
    return axios.post(url + '/updatePower', payload)
}