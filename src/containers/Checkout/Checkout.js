import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../containers/ContactData/ContactData';

class Checkout extends React.Component{
    state = {
        ingredients: null,
        cost: 0
    }
    
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsVal = {};
        let priceVal = 0;

        for(let param of query.entries()){
            if(param[0] === 'cost'){
                priceVal = param[1];
            }
            else {
                ingredientsVal[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredientsVal, cost: priceVal});
    }

    checkoutCancel = ()=>{
        this.props.history.goBack();
    }

    checkoutContinue = () =>{
        this.props.history.replace('checkout/contact-data');
    }

    render(){
        return(
        <div>
            <CheckoutSummary 
                ingredients = {this.state.ingredients}
                cancelFunction = {this.checkoutCancel}
                continueFunction = {this.checkoutContinue}/>
            <Route 
                path = {this.props.match.path + '/contact-data'} 
                render = { (props)=> (<ContactData ingredients = {this.state.ingredients} cost = {this.state.cost} {...props}/>)}
            />
                
        </div>
        );
    };    
}

export default Checkout;