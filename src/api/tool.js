import axios from '@/request'
const url = 'http://edu.aodianyun.com/admin/tool'

//获取工具列表
export const getToolList = (payload = {}) => {
    return axios.post(url + '/getToolList', payload)
}

//删除工具
export const delTool = (payload = {}) => {
    return axios.post(url + '/delTool', payload)
}

//添加工具
export const addTool = (payload = {}) => {
    return axios.post(url + '/addTool', payload)
}

//获取工具详情
export const getToolInfo = (payload = {}) => {
    return axios.post(url + '/getToolInfo', payload)
}

//更新工具信息
export const updateTool = (payload = {}) => {
    return axios.post(url + '/updateTool', payload)
}