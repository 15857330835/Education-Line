import axios from '@/request'
const url = 'http://edu.aodianyun.com/teach/courseware'
let config = {
    headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
    }
}

//获取课程列表
export const getSubjectList = (payload = {}) => {
    return axios.post(url + '/getSubjectList', payload)
}

//获取课件列表
export const getCoursewareList = (payload = {}) => {
    return axios.post(url + '/getCoursewareList', payload)
}

//更新课程状态
export const updateSubjectStatus = (payload = {}) => {
    return axios.post(url + '/updateSubjectStatus', payload)
}

//添加课件
export const addCourseware = (payload = {}) => {
    return axios.post(url + '/addCourseware', payload)
}

//删除课件
export const delCourseware = (payload = {}) => {
    return axios.post(url + '/delCourseware', payload)
}

//删除课程
export const delSubject = (payload = {}) => {
    return axios.post(url + '/delSubject', payload)
}

//添加课程
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

//上传图片
export const uploadPic = (payload = {}) => {
    return axios.post(url + '/uploadPic', payload, config)
}