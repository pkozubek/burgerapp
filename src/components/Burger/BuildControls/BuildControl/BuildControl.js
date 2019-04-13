import styles from './BuildControl.module.css'
import React from 'react';

const buildControl= (props) => {
    return(
        <div className = {styles.BuildControl}>
            <div className = {styles.Label}>{props.label}</div>
            <button disabled = {props.disabled} className = {styles.Less} onClick = {props.removeFunc}>Less</button>
            <button className = {styles.More} onClick = {props.addFunc}>More</button>
        </div>
    );
};

export default buildControl;