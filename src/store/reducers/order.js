import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utitlity';

const initialState = {
    loading: false,
    orders: [],
    purchased: false,
    error: null
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case(actionTypes.BURGER_ORDER_SUCCESS):

        const newOrder = {
            ...action.orderData,
            id: action.id
        }

        return updateObject(state,
            {orders: state.orders.concat(newOrder),
            loading: false,
            purchased: true}
        );
        
        case(actionTypes.BURGER_ORDER_FAIL):
        return updateObject(state,{
            error: action.error,
            loading: false
        })

        case(actionTypes.BURGER_ORDER_LOAD):
        return updateObject(state,{loading: true});

        case(actionTypes.BURGER_ORDER_INIT):
        return updateObject(state,{purchased: false});

        case(actionTypes.FETCH_ORDERS_LOAD):
        return updateObject(state,{loading: true});

        case(actionTypes.FETCH_ORDERS_FAIL):
        return updateObject(state,{loading: false, error: action.error});

        case(actionTypes.FETCH_ORDERS_SUCCESS):
        return updateObject(state,{orders: action.fetchedOrders, loading: false});

        default: 
            return state;
    }
}

export default reducer;