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

//获取考核列表
export const getExamList = (payload = {}) => {
    return axios.post(url + '/getExamList', payload)
}

//开始考核
export const addExam = (payload = {}) => {
    return axios.post(url + '/addExam', payload)
}

//开始录制
export const startVideoStudent = (payload = {}) => {
    return axios.post(url + '/startVideo', payload)
}

//结束录制
export const endVideoStudent = (payload = {}) => {
    return axios.post(url + '/endVideo', payload)
}

//提交考核视频
export const submitExam = (payload = {}) => {
    return axios.post(url + '/submitExam', payload)
}

//删除考核
export const deleteExam = (payload = {}) => {
    return axios.post(url + '/deleteExam', payload)
}

//保存考核视频
export const saveVideoUrlStudent = (payload = {}) => {
    return axios.post(url + '/saveVideoUrl', payload)
}