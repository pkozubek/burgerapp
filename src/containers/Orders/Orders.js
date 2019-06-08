import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithError from '../../hoc/WithError/WithError';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component{

    componentDidMount(){
        console.log(this.props.token);
       this.props.handleFetchOrders(this.props.token, this.props.userId);
    }

    render(){

    let orders = <Spinner/>;
    
    if(!this.props.loading){
    orders = 
    (<div>
        {this.props.orders.map((order)=>(
            <Order 
            key = {order.id}
            ingredients = {order.ingredients}
            cost = {order.cost}
            />
        ))}
    </div>
    );
    }
    
    return orders;
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.login.token,
        userId: state.login.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        handleFetchOrders: (token,userId)=>dispatch(actions.handleFetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(Orders, axios));