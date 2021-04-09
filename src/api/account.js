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