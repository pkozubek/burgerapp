import React from 'react';
import styles from './Order.module.css';

const order = (props) =>{
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, val: props.ingredients[ingredientName]});
    }

    const ingredientText = ingredients.map((ig)=>{
        return <span key = {ig.name}> {ig.name}:({ig.val}) </span>
    })

    return(
        <div className = {styles.Order} key = {props.id}>
            <p>item {ingredientText}</p>
            <p>Total cost <b>{props.cost}</b></p>            
        </div>
    )
}

export default order;