import * as actionTypes from '../actions/actionTypes';

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

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                cost: state.cost + INGREDIENT_PRICE[action.ingredientName]
            }
            
        case actionTypes.REMOVE_INGREDIENT:
        return{...state,
             ingredients:{
            ...state.ingredients,
            [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            cost: state.cost - INGREDIENT_PRICE[action.ingredientName]
        }

        case actionTypes.INIT_INGRIDIENTS:
        return{
            ...state,
            ingredients:action.ingredients,
            error: false
        }

        case actionTypes.INIT_INGRIDIENTS_FAIL:
        return{
            ...state,
            error: true
        }

        default:
            return state;
    }
}

export default reducer;
