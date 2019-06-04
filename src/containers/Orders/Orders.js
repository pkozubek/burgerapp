import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithError from '../../hoc/WithError/WithError';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component{

    componentDidMount(){
       this.props.handleFetchOrders();
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
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        handleFetchOrders: ()=>dispatch(actions.handleFetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(Orders, axios));