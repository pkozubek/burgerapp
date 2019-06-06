import React from 'react';
import {connect} from 'react-redux';
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
            <Toolbar 
            click = {this.sideDrawerHandler}
            isAuth = {this.props.isAuth}/>
            <SideDrawer 
            isAuth = {this.props.isAuth}
            show = {this.state.showSideDrawer} 
            click = {this.sideDrawerHandler}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{   
    return {
        isAuth: state.login.token != null
    }
}

export default connect(mapStateToProps)(Layout);