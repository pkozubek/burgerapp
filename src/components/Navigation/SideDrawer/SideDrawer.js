import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = (props) => {

    let currentClasses = [styles.SideDrawer, styles.Close]; 
    
    if(props.show)
        currentClasses = [styles.SideDrawer, styles.Open];  

    return (
        <React.Fragment>
        <div className = {currentClasses.join(' ')}>
            <div className = {styles.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        <Backdrop click = {props.click} show = {props.show}/>
        </React.Fragment>       
    );

}

export default sideDrawer;