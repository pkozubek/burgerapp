import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component{
    componentDidMount(){
        this.props.logUserOut();
    }

    render(){
        return <Redirect to = '/' />
    }
}

const mapDispatchToProps = dispatch =>{
    return {
       logUserOut : ()=>dispatch(actions.logOut())
    };
}

export default connect(null,mapDispatchToProps)(Logout);