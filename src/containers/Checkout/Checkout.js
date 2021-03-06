import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to = '/'/>
        let purchasedRedirect = this.props.purchased ? <Redirect to = '/'/> : null;
        
        if(this.props.ingr){
            summary = (<div>
            {purchasedRedirect}
            <CheckoutSummary 
                ingredients = {this.props.ingr}
                cancelFunction = {this.checkoutCancel}
                continueFunction = {this.checkoutContinue}/>
            <Route 
                path = {this.props.match.path + '/contact-data'} 
                component = {ContactData}
                />
        </div>)
        }

        return summary;
    };    
}

const mapStateToProps = (state)=>{
    return{
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);