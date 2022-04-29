import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';


function ProductList() {
    /* 
        we immediately execute the useStoreContext() function to retrieve the current global state object 
        and the dipatch() method to update state.

        We then destructure the currentCategory data out of the state object so we can use it in the filterProducts() function.
    */

    const [state, dispatch] = useStoreContext();
    const { currentCategory } = state;
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    /* 
        We then implement the useEffect() Hook in order to wait for our useQuery() response to come in. Once the data
        object returned from useQuery() goes from undefined to having an actual value, we execute our dispatch() function, 
        instructing our reducer function that it's the UPDATE_PRODUCTS action and it should save the array of product data 
        to our global store. When that's done, useStoreContext() executes again, giving us the product data needed display 
        products to the page.
    */
    useEffect(() => {
        // if there's data to be stored
        /* 
            we've added in a check after the if (data) statement to see if we should lean on IndexedDB for the data instead. 
            If so, we'll run idbPromise() to get all of the data from the products store and use the returning array of product
             data to update the global store.
        */
        if(data) {
            // let's store it in the global state object
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });
            // but let's also take each product and save it to IndexedDB using the helper function
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
            // add else if to check if `loading` is defined in `useQuery()` Hook
        } else if( !loading ) {
            // since we're offline, get all of the data from the `products` store
            idbPromise('products', 'get').then((products) => {
                // use retrieve data to set global state for offline browsing
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                });
            });
        }
    }, [data,loading, dispatch]);

    function filterProducts() {
        if(!currentCategory) {
            return state.products;
        }
        return state.products.filter(product => product.category._id === currentCategory);
    }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}  // selected product's _id value using react router useParams()
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
