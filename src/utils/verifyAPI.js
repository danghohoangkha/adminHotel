import axios from 'axios';
import * as Config from '../constant/config'

const callApi = (endpoint, method, headers) => {
    console.log('chay call api')
    return axios({
        method: method,
        url: Config.Backend_API + '/' + endpoint,
        headers: headers,
    })
}

export default callApi;