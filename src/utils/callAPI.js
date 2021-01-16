import axios from 'axios';
import * as Config from '../constant/config'

const callApi = (endpoint, method, body) => {
    return axios({
        method: method,
        url: Config.Backend_API + '/' + endpoint,
        data: body
    })
}

export default callApi;