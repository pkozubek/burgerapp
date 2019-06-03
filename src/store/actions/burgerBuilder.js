import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (initIngredients)=>{
    return{
        type: actionTypes.INIT_INGRIDIENTS,
        ingredients: initIngredients
    }
}

export const setIngredientsImportFail = ()=>{
    console.log('blad');
    return{
        type: actionTypes.INIT_INGRIDIENTS_FAIL
    }
}

export const initIngredients = ()=>{
    return dispatch =>{
        axios.get('/ingredients.json/')
        .then(response =>{
            dispatch(setIngredients(response.data));
        }
        ).catch(
            dispatch(setIngredientsImportFail())
        )
    }
}
