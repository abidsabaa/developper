import axios from 'axios';
//import jwt_decode from 'jwt_decode';
import setAuthToken from '../../utils/setAuthToken';
import {GET_ERRORS,SET_CURRENT_USER} from './types';

//register User and redirect to login
//@params {object} userData
//@params {location} history
export const registerUser = (userData,history) => dispatch =>{
   axios
     .post("/api/User/register",userData)
     .then(res => history.push("login"))
     .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data 
        })
    );
};

//Set Logged In user
export const setCurrentUser = decoded =>{
    return{
        type: SET_CURRENT_USER,
        payload:decoded
    }
}

//Logout User
export const logoutUser = () => dispatch =>{
    //Remove token
    localStorage.removeItem("jwtToken");
    //Remove auth header
    setAuthToken(false);
    //set current user to empty object
    dispatch(setCurrentUser({}));
}