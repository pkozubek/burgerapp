import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>{
    console.log(props.isAuth);

    return (
        <ul className = {styles.NavigationItems} >
                <NavigationItem link = '/' active = {true} >Burger</NavigationItem>
            {props.isAuth ? <NavigationItem link = '/orders'>Orders</NavigationItem> : null }
            {!props.isAuth 
                ? <NavigationItem link = '/login'>Login</NavigationItem>
                : <NavigationItem link = '/logout'>Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;