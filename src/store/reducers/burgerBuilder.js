import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utitlity';
 
const initialState = {
    ingredients: null,
    cost: 2,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 0.2,
    bacon: 1,
    cheese: 0.5,
    meat: 2
}

const addIngredient = (state,action)=>{
    const updatedIngredientAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredientsAdd = updateObject(state.ingredients, updatedIngredientAdd);
    const updatedStateAdd = {
        ingredients: updatedIngredientsAdd,
        cost: state.cost + INGREDIENT_PRICE[action.ingredientName]
    }

    return updatedStateAdd
}

const removeIngredient =(state,action)=>{
    const updatedIngredientRem = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            const updatedIngredientsRem = updateObject(state.ingredients, updatedIngredientRem);
            const updatedState = {
                ingredients: updatedIngredientsRem,
                cost: state.cost + INGREDIENT_PRICE[action.ingredientName]
            }
    
    return updatedState
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
        return addIngredient(state,action);
        
        case actionTypes.REMOVE_INGREDIENT:
        return removeIngredient(state,action);

        case actionTypes.INIT_INGRIDIENTS:
        return updateObject(state,{ ingredients:action.ingredients, error: false})

        case actionTypes.INIT_INGRIDIENTS_FAIL:
        return updateObject(state,{ cost: 2, error: true})

        default:
            return state;
    }
}

export default reducer;
