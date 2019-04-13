import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-59617.firebaseio.com/'
})

export default instance;