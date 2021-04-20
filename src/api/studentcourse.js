import axios from '@/request'
const url = window.EL.host + '/study/courseware'

//获取全部课程
export const getSubjectList = (payload = {}) => {
    return axios.post(url + '/getSubjectList', payload)
}

//获取课程详情
export const getSubjectInfo = (payload = {}) => {
    return axios.post(url + '/getSubjectInfo', payload)
}

//获取课件列表
export const getCoursewareList = (payload = {}) => {
    return axios.post(url + '/getCoursewareList', payload)
}

//报名课程
export const signUpSubject = (payload = {}) => {
    return axios.post(url + '/signUpSubject', payload)
}

//获取我的课程
export const getMySubjectList = (payload = {}) => {
    return axios.post(url + '/getMySubjectList', payload)
}