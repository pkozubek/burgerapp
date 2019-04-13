import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props)=>{
    
    console.log(props);

    return (
        <div className = {styles.CheckoutSummary}>
            <h1>Thats your burger, bon'apetit!</h1>
            <div style = {{width: '300px', height: '300px', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button 
            buttonType = 'Danger' 
            click = {props.cancelFunction}>Cancel</Button>
            <Button 
            buttonType = 'Success' 
            click = {props.continueFunction}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;