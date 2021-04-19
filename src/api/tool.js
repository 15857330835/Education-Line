import axios from '@/request'
const url = 'http://edu.aodianyun.com/admin/tool'
let config = {
    headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
    }
}

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

//上传图片
export const uploadPic = (payload = {}) => {
    return axios.post(url + '/uploadPic', payload, config)
}