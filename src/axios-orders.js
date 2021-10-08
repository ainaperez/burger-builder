import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'https://react-my-burger-95e4a-default-rtdb.europe-west1.firebasedatabase.app'
    
    //'https://react-my-burger-95e4a-default-rtdb.europe-west1.firebasedatabase.app'
}); 

export default instance;