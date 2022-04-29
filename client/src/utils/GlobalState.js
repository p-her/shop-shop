/* 
   - createContext will be used to instantiate a new Context object. The more meaningful term we can use here is 
     that we're using it to create the container to hold our global state data and functionality so we can provide
     it throughout our app!

   - useContext is another React Hook that will allow us to use the state created from the createContext function.
*/
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// instantiate the global state object
/* 
    The Provider is a special type of React component that we wrap our application in so it can make the state data that's passed into
    it as a prop available to all other components. The Consumer is our means of grabbing and using the data that the Provider holds for us.
*/
const StoreContext = createContext(); // create a new Context object
const { Provider } = StoreContext; // every Context object comes with 2 components (Provider and Consumer)


/* 
    With this function, StoreProvider, we instantiate our initial global state with the useProductReducer() function we created earlier.
    Because that wraps it around the useReducer() Hook from React, every time we run this useProductReducer() function, we receive the following two items in return:
        - *** STATE is the most up-to-date version of our global state object.
        - *** DISPATCH is the method we execute to update our state. It is specifically going to look for an action object passed in as its argument, as we'll soon see.

    After the useProductReducer() completes and provides us with the new state and function to update state (e.g., dispatch), we then return the StoreContext's 
    <Provider> component with our state object and dispatch the function provided as data for the value prop.

    With all of this in place, the StoreProvider function isn't as much of a function as it is our own custom <Provider> component! That's why the parameters defined 
    at the top, the value and ...props, are there. It's actually set up to accept props if it needs to, and it does!

    The value prop is good to have included, as it opens us up to pass in more data for state if we need to. We don't actually need to in this app, but it makes this 
    provider flexible. The other prop, or rather ...props, is in place to handle any other props the user may need. Namely, we'll need to use props.children, as this
    <StoreProvider> component will wrap all of our other components, making them children of it. If we didn't include {...props} in our returning <Provider> component,
    nothing on the page would be rendered!

    we did here was create our own functionality to manage state at a global level and make it available to all of our other components through a special <Provider> component. 
    The last thing we need to do is create the custom function using the useContext() Hook to be used by the components that actually need the data our <StoreProvider> will be, well . . . providing!
*/
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works!
    
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
}


/* 
    We just created our own custom React Hook! When we execute this function from within a component, we will receive the [state, dispatch] data our StoreProvider provider manages for us. This means that any component that has access to our StoreProvider component can use any data in our global state container or update it using the dispatch function.
*/
const useStoreContext = () => {
    return useContext(StoreContext);
};





export { StoreProvider, useStoreContext };