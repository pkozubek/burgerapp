import React, {Component, Fragment} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Styles from './LoginScreen.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class LoginScreen extends Component {
    state = {
        inputs: {
            email: {
            elementType: 'input',
            elementConfig:{
                type : 'text',
                placeholder : 'Email',
                name : 'email '
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            moded: false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type : 'password',
                    placeholder : 'Password',
                    name : 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                moded: false
                }
        },
        register: true
    }

    componentDidMount(){
        if( !this.props.isBuilded && this.props.redirectUrl !== '/'){
            this.props.redirectUrl()
        }
    }

    checkValidity = (value, rules)=>{
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;

            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }

            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }

            if(rules.isEmail){
                isValid = /\S+@\S+\.\S+/.test(value) && isValid
            }
        }
        else{
            isValid = true;
        }
        return isValid;
    }

    changeValHandler = (event, controlName) => {

        const updatedInputs = {
            ...this.state.inputs,
            [controlName]: {
                ...this.state.inputs[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value , this.state.inputs[controlName].validation),
                moded: true
            }
        }

        console.log(updatedInputs);

        this.setState({
            inputs: updatedInputs
        });
    }

    handleLoginClick = (event)=>{
        event.preventDefault();
        this.props.loginHandle(this.state.inputs.email.value,this.state.inputs.password.value,this.state.register);
    }

    changeMethod = () =>{
        this.setState(prevState =>{
            return{
                register : !prevState.register
            }
        })
    }

    render(){
        let formArray = [];

        for (let keyVal in this.state.inputs){
            formArray.push(
                {
                    id: keyVal,
                    config: this.state.inputs[keyVal]
                }
            )
        }

        let form = formArray.map(
            (formElement) => {
                return (
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType} 
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value} 
                        isValid = {formElement.config.valid}
                        shouldValid = {formElement.config.validation}
                        moded = {formElement.config.moded}
                        change = {(event) =>this.changeValHandler(event, formElement.id)}
                        />);
            }
        )
        
        let loginType = this.state.register ? 'login' :  'register';
        
        let formOutput = null;

        if(this.props.loading){
            formOutput = <Spinner/>
        }else{
            formOutput = (<Fragment>
                <h2>{this.state.register ? 'Register new user' : 'Login'}</h2>
                <form >
                    {form}
                    <Button 
                    buttonType = 'Success'
                    click = {this.handleLoginClick}>
                    Confirm
                    </Button>
                </form>
                <Button
                 buttonType = 'Danger'
                 click = {this.changeMethod}>
                 Switch to: {loginType}
                </Button>
            </Fragment>);
        }

        let errorOutput = null;
        if(this.props.error){
            errorOutput = <p>{this.props.error}</p>
        }

        let authRedirect = null
        if(this.props.isAuth)
            authRedirect = <Redirect to = {this.props.urlRedirect}/>

        return (<div className = {Styles.LoginScreen}>
           {authRedirect}
           {errorOutput}
           {formOutput}
           </div>);
    }
}

const mapStateToProps = state => {
    return {
        loading: state.login.load,
        error: state.login.error,
        isAuth: state.login.token !== null,
        urlRedirect: state.login.urlRedirect,
        isBuilded: state.burgerBuilder.isBuilded
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loginHandle : (email,password,isRegister)=>dispatch(actions.loginHandle(email,password, isRegister)),
        redirectUrl : ()=>dispatch(actions.changeRedirect('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);