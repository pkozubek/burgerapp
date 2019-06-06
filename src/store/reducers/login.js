import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utitlity';

const initialState = {
    token: null,
    userId: null,
    error: null,
    load: false
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case(actionTypes.LOGIN_SUCCESS):
            return updateObject(state,{
                token: action.token,
                userId: action.userId,
                load: false,
                error: null
            });
        
        case(actionTypes.LOGIN_START):
            return updateObject(state,{load: true, error: null});
        
        case(actionTypes.LOGIN_FAIL):
            return updateObject(state,{error: action.error, load: false});
        
        case(actionTypes.LOGIN_LOGOUT):
            return updateObject(state,{userId: null, token: null});

        default: return state;
        
    }
}

export default reducer;
