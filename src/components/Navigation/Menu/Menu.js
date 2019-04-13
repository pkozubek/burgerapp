import React from 'react';
import styles from './Menu.module.css'

const menu = (props)=>{
    return (
        <div className = {styles.Menu} onClick = {props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default menu;