import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) =>{
    return (
        <ul className = {styles.NavigationItems} >
            <NavigationItem link = '/' active = {true} >Burger</NavigationItem>
            <NavigationItem link = '/orders'>Orders</NavigationItem>
        </ul>
    );
}

export default navigationItems;