import React from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';

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
        }
        else{
            isValid = true;
        }

        return isValid;
    }
    
    changeValHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...this.state.orderForm[inputId]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.moded = true;
        console.log(updatedFormElement);

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

        this.setState ( {
            loading: true
        });
        
        console.log(this.props);

        let formData = {};

        for(let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const postData = {
            ingredients : this.props.ingr,
            cost: this.props.cost,
            orderData: formData
        }

        axios.post('/orders.json', postData )
        .then(resposne => {
            this.setState ( {
                loading: false
            });
            this.props.history.push('/');
        })
        .catch(error =>{
            this.setState ( {
                loading: false
            });
        });
        
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
        if(this.state.loading){
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
        ingr: state.ingredients,
        cost: state.cost
    }
}

export default connect(mapStateToProps)(ContactData);