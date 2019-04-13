import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithError from '../../hoc/WithError/WithError';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/action';

let INGREDIENTS_PRICE = {
    
};

class BurgerBuilder extends React.Component{

    state = {
        orderBlocked: true,
        wasOrdered: false,
        loading: false
    };
  
    componentDidMount (){
        /*
        axios.get('/cost.json/')
            .then(response =>{
                INGREDIENTS_PRICE = response.data;
                console.log(INGREDIENTS_PRICE);
            }
        ).catch(error => alert(error))
        */
    }

    possibleOrderHandler = (ingredients)=>{
        let sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)
        
        let orderBlocked = sum <=0;
        return orderBlocked;
    }

    wasOrderedHandler = ()=>{
        this.setState({wasOrdered: true});
    };
    
    cancelOrderHandler = () => {
        this.setState({wasOrdered: !this.state.wasOrdered})
    };

    checkoutHandler = () =>{
        /*
        const queryParams = [];
        for(let i in this.props.ingr){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingr[i]))
        }
        queryParams.push('cost='+ this.props.cost);
        const queryString = queryParams.join('&');
        */

        this.props.history.push('/checkout'); 

    };

    handleLoading = () =>{
        
        let modal =<OrderSummary 
        checkoutClick = {this.checkoutHandler} 
        cost = {this.props.cost} 
        cancelClick = {this.cancelOrderHandler} 
        ingredients = {this.props.ingr}
        />


        if(this.state.loading)
            modal = <Spinner/>
        
        return modal;

        
    }

    render(){
        let disabledInfo = {
            ...this.props.ingr
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let currentModal = this.handleLoading(); 

        return(
        <React.Fragment>
            <Modal show = {this.state.wasOrdered} click = {this.cancelOrderHandler}>
                {currentModal}
            </Modal>
            <Burger ingredients = {this.props.ingr}/>
            <BuildControls 
                removeHandler = {this.props.onIgredientDelete} 
                addHandler = {this.props.onIgredientAdd}
                disabledInfo = {disabledInfo}
                cost = {this.props.cost}
                orderBlocked = {this.possibleOrderHandler(this.props.ingr)}
                wasOrdererClick = {this.wasOrderedHandler}/>
        </React.Fragment>
        );
    };
}


const mapStateToProps = (state)=>{
    return{
        ingr: state.ingredients,
        cost: state.cost
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onIgredientAdd: (name)=>dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIgredientDelete: (name)=>dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(BurgerBuilder,axios));