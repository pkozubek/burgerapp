import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import LoginScreen from './containers/LoginScreen/LoginScreen';
import Logout from './components/Logout/Logout';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount(){
    this.props.checkLoginStatus();
  }

  render() {

    let routes = (
      <Switch>
        <Route path = '/' exact component = {BurgerBuilder}/>
        <Route path = '/login' component = {LoginScreen}/>
        <Redirect to = '/' />
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path = '/login' component = {LoginScreen}/>
          <Route path = '/checkout' component = {Checkout}/>  
          <Route path = '/orders' component = {Orders}/>  
          <Route path = '/logout' component = {Logout}/>
          <Route path = '/' exact component = {BurgerBuilder}/>
          <Redirect to = '/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuth: state.login.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoginStatus : () => dispatch(actions.checkLoginStatus())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
