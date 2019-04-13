import React from 'react';
import styles from './Input.module.css'

const input = (props) =>{
    let inputElement = null;
    let newStyle = [styles.InputElement];

    if(!props.isValid && props.shouldValid && props.moded){
        newStyle.push(styles.Invalid);
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input 
            className = {newStyle.join(' ')} 
            {...props.elementConfig} 
            value = {props.value}
            onChange = {props.change}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
            className = {newStyle.join(' ')} 
            {...props}
            value = {props.value}
            onChange = {props.change}
            />;
            break;
        case('select'):
            inputElement = (
            <select  className = {newStyle.join(' ')} value = {props.value} onChange = {props.change}>  
            {props.elementConfig.options.map((option)=>{
                return(<option key = {option.value} value = {option.value}>{option.displayValue}</option>);
            })}
            </select>);
        break;
        default:
            inputElement = <input 
            className = {styles.InputElement} 
            {...props}
            value = {props.value}
            onChange = {props.change}
            />;
            break;
    }

    return(
        <div>
            <label className = {styles.Label}>{props.labelText}</label>
            {inputElement }
        </div>
    );
}

export default input;