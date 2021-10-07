import axios from 'axios'; 

const instance = axios.create({
    baseUrl: 'https://react-my-burger-95e4a-default-rtdb.europe-west1.firebasedatabase.app'
}); 

export default instance;