import axios from '@/request'
const url = window.EL.host + '/admin/company'

//更新机构状态
export const updateStatus = (payload = {}) => {
    return axios.post(url + '/updateStatus', payload)
}

//获取机构列表
export const getCompanyList = (payload = {}) => {
    return axios.post(url + '/getCompanyList', payload)
}

//添加机构
export const addCompany = (payload = {}) => {
    return axios.post(url + '/addCompany', payload)
}

//删除机构
export const delCompany = (payload = {}) => {
    return axios.post(url + '/delCompany', payload)
}

//重置密码
export const updatePassword = (payload = {}) => {
    return axios.post(url + '/updatePassword', payload)
}

//更新机构信息
export const updateInfo = (payload = {}) => {
    return axios.post(url + '/updateInfo', payload)
}