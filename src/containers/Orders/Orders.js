import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithError from '../../hoc/WithError/WithError';

class Orders extends React.Component{
    state = {
        loading: false,
        databaseOrders: []
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then((res)=>{
            const storedOrders = [];
            for(let key in res.data){
                storedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: true, databaseOrders: storedOrders});
        }).catch(err => {
            this.setState({loading: false})
        });

    }

    render(){
    return(
    <div>
        {this.state.databaseOrders.map((order)=>(
            <Order 
            id = {order.id}
            ingredients = {order.ingredients}
            cost = {order.cost}
            />
        ))}
    </div>);
    }
}

export default WithError(Orders, axios);