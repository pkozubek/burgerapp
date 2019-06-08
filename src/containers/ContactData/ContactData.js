import React from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import WithError from '../../hoc/WithError/WithError';
import * as orderActions from '../../store/actions/index';
import {checkValidity} from '../../shared/shared';

class ContactData extends React.Component{
    state = {
        orderForm: {
            name: {
            elementType: 'input',
            elementConfig:{
                type : 'text',
                placeholder : 'Your name',
                name : 'name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            moded: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type : 'text',
                    placeholder : 'Your Email',
                    name : 'email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                moded: false
            },
            adress:{
                elementType: 'input',
                elementConfig:{
                    type : 'text',
                    placeholder : 'Your Adress',
                    name : 'adress'
                },
                value: '' ,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 100
                },
                valid: false,
                moded: false
            },
            delivery:{
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fast', displayValue: 'Fast' },
                        {value: 'cheap', displayValue: 'Cheap' }
                    ]
                },
                value: 'fast',
                valid: true,
                validation:{}
            },
        },
        formIsValid: false,
        loading: false
    };
    
    changeValHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...this.state.orderForm[inputId]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.moded = true;

        updatedForm[inputId] = updatedFormElement;

        let updatedFormIsValid =  true;
        for(let elementId in updatedForm){
            updatedFormIsValid = updatedForm[elementId].valid && updatedFormIsValid;
        }

        this.setState({orderForm: updatedForm, formIsValid: updatedFormIsValid});
    }

    submitHandler = (event) =>{
        event.preventDefault();
    }

    orderHandler = (event)=>{
        event.preventDefault();

        /*
        this.setState ( {
            loading: true
        });*/
        
        let formData = {};

        for(let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const postData = {
            ingredients : this.props.ingr,
            cost: this.props.cost,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.handleBurgerOrder(postData, this.props.token);               
    }

    render(){

        let formArray = [];

        for (let keyVal in this.state.orderForm){
            formArray.push(
                {
                    id: keyVal,
                    config: this.state.orderForm[keyVal]
                }
            )
        }

        let form = (        
        <form onSubmit = {this.orderHandler}>
            <h4>Your order data: </h4>
            {formArray.map((formElement)=>{
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
            })}
            <Button buttonType = 'Success' disabled = {!this.state.formIsValid}>ORDER!</Button>
        </form>);
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
        <div className = {styles.ContactData}>
        {form}
        </div>);
    }
}

const mapStateToProps = (state)=>{
    return{
        ingr: state.burgerBuilder.ingredients,
        cost: state.burgerBuilder.cost,
        loading: state.order.loading,
        userId: state.login.userId,
        token: state.login.token
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        handleBurgerOrder: (postData,token)=>dispatch(orderActions.handleBurgerOrder(postData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithError(ContactData,axios));