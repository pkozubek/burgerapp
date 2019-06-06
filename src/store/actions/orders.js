import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerOrderSuccess = (orderId, postData)=>{
    return{
        type: actionTypes.BURGER_ORDER_SUCCESS,
        id: orderId,
        orderData: postData,
        error: null
    }
}

export const burgerOrderFail = (error)=>{
    return{
        type: actionTypes.BURGER_ORDER_FAIL,
        error: error
    }
}

export const burgerOrderLoading = ()=>{
    return {
        type: actionTypes.BURGER_ORDER_LOAD
    }
}

export const bugerOrderInit = ()=>{
    return {
        type: actionTypes.BURGER_ORDER_INIT
    }
}

export const handleBurgerOrder = (orderData)=>{
    return dispatch =>{
    dispatch(burgerOrderLoading());

    axios.post('/orders.json', orderData )
        .then(response => {
            dispatch(burgerOrderSuccess(response.data.name, orderData));
        })
        .catch(error =>{
            dispatch(burgerOrderFail(error));
        });
    };
};

export const fetchOrdersSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchedOrders: orders
    }
}

export const fetchOrdersFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersLoad = ()=>{
    return {
        type: actionTypes.FETCH_ORDERS_LOAD
    }
}

export const handleFetchOrders = (token)=>{
    return dispatch =>{
    dispatch(fetchOrdersLoad());
    const url = '/orders.json?auth=' + token;
    console.log(url);
    axios.get(url)
    .then((res)=>{
        const storedOrders = [];
        for(let key in res.data){
            storedOrders.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(fetchOrdersSuccess(storedOrders));
    }).catch(error => {
        dispatch(fetchOrdersFail(error));
    });
    }
}