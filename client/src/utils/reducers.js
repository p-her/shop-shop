import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

import { useReducer } from 'react';

/*  
    Adding this code to the reducers.js file imports the possible actions we can perform and creates a function called reducer(). 
    When the function executes, we pass the value of the action.type argument into a switch statement and compare it to our possible actions. 
    Because we're only testing the one action for now, we only need to check it against the UPDATE_PRODUCTS action.

    If it's that action type, we return a new object with a copy of the state argument using the spread ... operator and then set the products 
    key to a value of a new array with the action.products value spread across it. If it's not that action type, we make no change to state and 
    return it as is. This is in case we accidentally execute an action that isn't predefined.
*/
export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products]
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };

        case UPDATE_CURRENT_CATEGORY:
            return {
            ...state,
            currentCategory: action.currentCategory
        };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true, // set to true so the users can immediately view the cart with newly added item
                cart: [...state.cart, action.product]
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case REMOVE_FROM_CART:
            /*  filter() method only keeps the items that dont match the provided
                _id property. In the return statement, we check the length of the 
                array to set cartOpen to false when the array is empty.
            */
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            })

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        // use map() to create a new array instead of updating state.cart directly
        // because the original state should be treated as immutable.
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map( product => {
                    if(action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        
  
      default:
        return state;
    }
  };


  /* 
    This function, useProductReducer(), will be used to help initialize our global state object and then provide us with 
    the functionality for updating that state by automatically running it through our custom reducer() function. Think of 
    this as a more in-depth way of using the useState() Hook we've used so much.
  */

  export function useProductReducer(initialState) {
      return useReducer(reducer, initialState);
  }