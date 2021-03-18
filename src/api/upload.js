import axios from '@/request'
const url = '/v2/DVR.SubmitJobs'

export const uploadApi = (payload = {}) => {
    return axios.post(url, payload)
}