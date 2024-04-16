import axios from "axios";
import jwt_decode from 'jwt-decode';
import { store } from '../../states/store';
import { user } from "../../states/userReducer";
import { logout } from '../userActions';

export const setAuthenticationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
}

export const getAuthenticationToken = () => {

    if (localStorage.token) {
        
        setAuthenticationToken(localStorage.token);
        
        const decode = jwt_decode(localStorage.token);

        store.dispatch(user({user: decode, connected: true}))

        const currentDate = Math.floor(Date.now() / 1000);

        if(decode.exp < currentDate) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
    }
}