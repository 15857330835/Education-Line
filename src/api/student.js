import axios from '@/request'
const url = window.EL.host + '/study/account'

//获取上传参数
export const getAccessStudent = (payload = {}) => {
    return axios.post(url + '/getAccess', payload)
}
