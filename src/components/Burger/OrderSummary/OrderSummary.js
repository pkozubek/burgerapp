import React from 'react';
import Button from '../../UI/Button/Button'


const orderSummary = (props)=>{
    
    let listOfOrder = Object.keys(props.ingredients)
    .map((ingredientsKey)=>{
        return (<li key = {ingredientsKey}>{ingredientsKey} : {props.ingredients[ingredientsKey]}</li>);
    }
    )
    
    return(
        <div>
            <h1>Your order:</h1>
            <ul>
                {listOfOrder}
            </ul>
            <p>Cost: {props.cost}</p>
            <Button 
            buttonType = 'Danger' 
            click ={props.cancelClick} >Cancel</Button>
            <Button 
            click = {props.checkoutClick} 
            buttonType = 'Success'>Continue</Button>
        </div>
    );
};

/*
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
*/

export default orderSummary;