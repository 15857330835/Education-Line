import axios from '@/request'
const url = 'http://edu.aodianyun.com/company/subject'

//获取课程列表
export const getSubjectList = (payload = {}) => {
    return axios.post(url + '/getSubjectList', payload)
}

//更新课程状态
export const updateSubjectStatus = (payload = {}) => {
    return axios.post(url + '/updateSubjectStatus', payload)
}

//增加课程
export const addSubject = (payload = {}) => {
    return axios.post(url + '/addSubject', payload)
}

//获取课程详情
export const getSubjectInfo = (payload = {}) => {
    return axios.post(url + '/getSubjectInfo', payload)
}

//更新课程
export const updateSubject = (payload = {}) => {
    return axios.post(url + '/updateSubject', payload)
}

//删除课程
export const delSubject = (payload = {}) => {
    return axios.post(url + '/delSubject', payload)
}