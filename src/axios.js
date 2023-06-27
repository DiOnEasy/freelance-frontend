import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});


//function to check if the user is authorized every time the page is refreshed
instance.interceptors.request.use((config) =>{
config.headers.Authorization = window.localStorage.getItem('token');
    console.log(config)
return config;
})

export default instance;