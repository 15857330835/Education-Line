import axios from '@/request'
const url = 'http://edu.aodianyun.com/study/courseware'

//获取全部课程
export const getSubjectList = (payload = {}) => {
    return axios.post(url + '/getSubjectList', payload)
}