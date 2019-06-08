import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithError from '../../hoc/WithError/WithError';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'; 

class BurgerBuilder extends React.Component{

    state = {
        orderBlocked: true,
        wasOrdered: false,
        loading: false
    };
  
    componentDidMount (){
        this.props.ingredientInit();
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
        
        if(this.props.isAuth)
            this.setState({wasOrdered: true});
        else{
            this.props.changeURL('/checkout');
            this.props.history.push('/login');
        }
    };
    
    cancelOrderHandler = () => {
        this.setState({wasOrdered: !this.state.wasOrdered})
    };

    checkoutHandler = () =>{
        this.props.orderInit();
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

        let burger = null;
        if(this.props.ingr){
            burger = (
            <React.Fragment>
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
        }else{
            burger = <Spinner/>
        }

        if(this.props.error){
            burger = (
                <div>Burger can't be loaded!</div>
            )
        }

        return(
        <React.Fragment>
            <Modal show = {this.state.wasOrdered} click = {this.cancelOrderHandler}>
                {currentModal}
            </Modal>
            {burger}
        </React.Fragment>
        );
    };
}


const mapStateToProps = (state)=>{
    return{
        ingr: state.burgerBuilder.ingredients,
        cost: state.burgerBuilder.cost,
        error: state.burgerBuilder.error,
        isAuth : state.login.token !== null,
        isBuilded: state.burgerBuilder.isBuilded
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onIgredientAdd: (name)=>dispatch(actions.addIngredient(name)),
        onIgredientDelete: (name)=>dispatch(actions.removeIngredient(name)),
        ingredientInit: ()=>dispatch(actions.initIngredients()),
        orderInit: ()=>dispatch(actions.bugerOrderInit()),
        changeURL: (url)=>dispatch(actions.changeRedirect(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(BurgerBuilder,axios));