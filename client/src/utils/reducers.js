import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
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