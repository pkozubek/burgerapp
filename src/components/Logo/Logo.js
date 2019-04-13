import React from 'react';
import logoImg from '../../assets/burger-logo.png'
import styles from './Logo.module.css'

const logo = (props) =>{
    return(
    <div className = {styles.Logo}>
        <img alt = 'logo' src = {logoImg} ></img>
    </div>
    )
}

export default logo;