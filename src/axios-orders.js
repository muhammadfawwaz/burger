import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-fb04c.firebaseio.com/'
})

export default instance