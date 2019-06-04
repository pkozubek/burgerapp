import styles from './BuildControls.module.css';
import BuildControl from  './BuildControl/BuildControl';
import React from 'react';

const buildControls= (props) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'}
    ];

    return(
        <div className = {styles.BuildControls}>
            <p>Current cost: <b>{Number(props.cost).toFixed(2)}</b></p>
            {controls.map(ctrl => (
                <BuildControl 
                    removeFunc = {()=>props.removeHandler(ctrl.type)} 
                    addFunc = {()=>props.addHandler(ctrl.type)} 
                    key = {ctrl.label} label = {ctrl.label}
                    disabled = {props.disabledInfo[ctrl.type]}/>
                )
            )}
            <button 
                onClick = {props.wasOrdererClick}
                className = {styles.OrderButton} 
                disabled = {props.orderBlocked}>ORDER</button>
        </div>
    );
};

export default buildControls;