import axios from '@/request'
const url = 'http://edu.aodianyun.com/admin/tool'

//获取工具列表
export const getToolList = (payload = {}) => {
    return axios.post(url + '/getToolList', payload)
}