import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component{ 
   
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = ()=>{
        this.setState({showSideDrawer : !this.state.showSideDrawer});
    }

    render(){

    return (
        <React.Fragment>
        <Toolbar click = {this.sideDrawerHandler}/>
        <SideDrawer show = {this.state.showSideDrawer} click = {this.sideDrawerHandler}/>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </React.Fragment>
        );
    }
}

export default Layout;