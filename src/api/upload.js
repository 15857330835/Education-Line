import axios from '@/request'
const url = 'https://openapi.aodianyun.com/v2/DVR.SubmitJobs'

export const uploadApi = (payload = {}) => {
    return axios.post(url, payload)
}