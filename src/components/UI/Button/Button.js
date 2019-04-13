import React from 'react';
import styles from './Button.module.css'

const button = (props) => {
    return <button
        disabled = {props.disabled}
        className = {[styles.Button, styles[props.buttonType]].join(' ')}
        onClick = {props.click}>
        {props.children}
    </button>
}

export default button;