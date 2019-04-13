import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithError from '../../hoc/WithError/WithError';

let INGREDIENTS_PRICE = {
    
};

class BurgerBuilder extends React.Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        cost: 2,
        orderBlocked: true,
        wasOrdered: false,
        loading: false
    };
  
    componentDidMount (){
        axios.get('/cost.json/')
            .then(response =>{
                INGREDIENTS_PRICE = response.data;
                console.log(INGREDIENTS_PRICE);
            }
        ).catch(error => alert(error))
    }

    possibleOrderHandler = (ingredients)=>{
        let sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)
        
        let orderBlocked = sum <=0;

        this.setState({orderBlocked: orderBlocked})
    }

    addIngredientsHandler = (type)=>{
        let previousVal = this.state.ingredients[type]; 
        
        let currentVal = previousVal + 1;
        let prevStateIngredients = {
            ...this.state.ingredients
        };
        
        prevStateIngredients[type] = currentVal;

        let currentCost = this.state.cost + INGREDIENTS_PRICE[type];

        this.setState({ingredients: prevStateIngredients, cost: currentCost});
        this.possibleOrderHandler(prevStateIngredients);
    };

    removeIngredientHandler = (type)=>{
        let previousVal = this.state.ingredients[type]; 
        
        let currentVal = previousVal;

        if (previousVal > 0)
            currentVal -= 1;
        
        let prevStateIngredients = {
            ...this.state.ingredients
        };
        
        prevStateIngredients[type] = currentVal;

        let currentCost = this.state.cost - INGREDIENTS_PRICE[type];

        this.setState({ingredients: prevStateIngredients, cost: currentCost});
        this.possibleOrderHandler(prevStateIngredients);
    };
    
    wasOrderedHandler = ()=>{
        this.setState({wasOrdered: true});
    };
    
    cancelOrderHandler = () => {
        this.setState({wasOrdered: !this.state.wasOrdered})
    };

    checkoutHandler = () =>{

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('cost='+ this.state.cost);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    };

    handleLoading = () =>{
        
        let modal =<OrderSummary 
        checkoutClick = {this.checkoutHandler} 
        cost = {this.state.cost} 
        cancelClick = {this.cancelOrderHandler} 
        ingredients = {this.state.ingredients}
        />


        if(this.state.loading)
            modal = <Spinner/>
        
        return modal;

        
    }

    render(){
        let disabledInfo = {
            ...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let currentModal = this.handleLoading(); 

        return(
        <React.Fragment>
            <Modal show = {this.state.wasOrdered} click = {this.cancelOrderHandler}>
                {currentModal}
            </Modal>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
                removeHandler = {this.removeIngredientHandler} 
                addHandler = {this.addIngredientsHandler}
                disabledInfo = {disabledInfo}
                cost = {this.state.cost}
                orderBlocked = {this.state.orderBlocked}
                wasOrdererClick = {this.wasOrderedHandler}/>
        </React.Fragment>
        );
    };
}

export default WithError(BurgerBuilder,axios);