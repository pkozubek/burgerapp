import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = (props)=>(
    <header className = {styles.Toolbar}>
        <Menu click = {props.click}/>
        <div className = {styles.Logo}>
            <Logo/>
        </div>
        <nav className = {styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
