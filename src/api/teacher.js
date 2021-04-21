import axios from '@/request'
const url = window.EL.host + '/teach/account'

//获取上传参数
export const getAccessTeacher = (payload = {}) => {
    return axios.post(url + '/getAccess', payload)
}
