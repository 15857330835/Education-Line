import axios from '@/request'
const url = window.EL.host + '/teach/courseware'
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

//更新课件状态
export const updateCoursewareStatus = (payload = {}) => {
    return axios.post(url + '/updateCoursewareStatus', payload)
}

//上传图片
export const uploadPic = (payload = {}) => {
    return axios.post(url + '/uploadPic', payload, config)
}

//保存视频
export const saveVideoUrlTeacher = (payload = {}) => {
    return axios.post(url + '/saveVideoUrl', payload)
}

//开始录制
export const startVideoTeacher = (payload = {}) => {
    return axios.post(url + '/startVideo', payload)
}

//结束录制
export const endVideoTeacher = (payload = {}) => {
    return axios.post(url + '/endVideo', payload)
}

//创建非编工程
export const createNces = (payload = {}) => {
    return axios.post(url + '/createNces', payload)
}

//修改非编工程
export const editNces = (payload = {}) => {
    return axios.post(url + '/editNces', payload)
}

//保存成果地址
export const saveRstUrl = (payload = {}) => {
    return axios.post(url + '/saveRstUrl', payload)
}

//获取考核成绩
export const getExamList = (payload = {}) => {
    return axios.post(url + '/getExamList', payload)
}