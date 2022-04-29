import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

/* 
    Currently the Cart component is populated with data from the global state object and not the useQuery() Hook, because the data doesn't come from the server. We want to set up this component to check for items saved in the cart object store of IndexedDB every single time the component opens
*/
const Cart = () => {
    const [state, dispatch] = useStoreContext();
    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }


    /* 
        With this function in place, we're checking to see if state.cart.length is 0, then executing getCart() to retrieve 
        the items from the cart object store and save it to the global state object. We dispatch the ADD_MULTIPLE_TO_CART
        action here because we have an array of items returning from IndexedDB, even if it's just one product saved. This 
        way we can just dump all of the products into the global state object at once instead of doing it one by one.
    */
    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart]});
        };

        if(!state.cart.length) {
            getCart();
        }

    }, [state.cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }
    /* 
        if cartOpen is false, the component will return a much samller
        <div>. Clicking this <div> however, will set cartOpen to true and 
        return the expanded shopping chart.
    */

    if(!state.cartOpen) {
        return (
            <div className='cart-closed' onClick={toggleCart} >
                <span role="img" aria-label='trash'>
                    🛒
                </span>
            </div>
        );
    }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
          <div>
                {state.cart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}
                <div className='flex-row space-between'>
                    <strong> Total: ${calculateTotal()}</strong>
                    {
                        Auth.loggedIn() ?
                        <button>
                           Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
          </div>

      ): (
          <h3>
              <span role="img" aria-label="shocked">
                😱
              </span>
              You haven't added anything to your cart yet!
          </h3>
        )}
         
        </div>
  );
};

export default Cart;