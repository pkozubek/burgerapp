import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginStart = ()=>{
    return{
        type: actionTypes.LOGIN_START
    }
}

export const loginFail = (error)=>{
    return{
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const loginSuccess = (token, userId)=>{
    return{
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId
    }
}

export const logOut = ()=>{
    return{
        type: actionTypes.LOGIN_LOGOUT
    }
}

export const handleTokenExpire = (expireTime)=>{
    return dispatch =>{
        setTimeout(()=> dispatch(logOut()) , expireTime * 1000);
    }
}

export const loginHandle = (email,password, isRegister)=>{
    return dispatch => {
        dispatch(loginStart());
        const config = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = null
        
        if(isRegister)
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAVgT3cJ2EeHwZEDnFjHh94JE5eFnNX5Do';
        else
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAVgT3cJ2EeHwZEDnFjHh94JE5eFnNX5Do';

        axios.post(url,config)
        .then(
            response => {
                console.log(response);
                dispatch(loginSuccess(response.data.idToken, response.data.localId));
                dispatch(handleTokenExpire(response.data.expiresIn));
            }
        )
        .catch(
            err => {
                dispatch(loginFail(err.response.data.error.message));
            }
        )
    }
}