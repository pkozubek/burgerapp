import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../containers/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends React.Component{
    
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
                ingredients = {this.props.ingr}
                cancelFunction = {this.checkoutCancel}
                continueFunction = {this.checkoutContinue}/>
            <Route 
                path = {this.props.match.path + '/contact-data'} 
                component = {ContactData}
                />
                
        </div>
        );
    };    
}

const mapStateToProps = (state)=>{
    return{
        ingr: state.ingredients,
        cost: state.cost
    }
}

export default connect(mapStateToProps)(Checkout);