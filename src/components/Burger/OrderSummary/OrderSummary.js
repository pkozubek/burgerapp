import React from 'react';
import Button from '../../UI/Button/Button'
import {connect} from 'react-redux';

const orderSummary = (props)=>{
    
    let listOfOrder = null
    if(props.ingr){
    listOfOrder = Object.keys(props.ingredients)
    .map((ingredientsKey)=>{
        return (<li key = {ingredientsKey}>{ingredientsKey} : {props.ingredients[ingredientsKey]}</li>);
    }
    )
    }

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

const mapStateToProps = (state)=>{
    return{
        ingr: state.ingredients,
    }
}

export default connect(mapStateToProps)(orderSummary);