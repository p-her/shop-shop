import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

const CartItem = ({ item }) => {

    /* 
        Note that we only destructured the dispatch() function from the useStoreContext Hook, because the CartItem component has no need to read state
    */
    const [, dispatch] = useStoreContext();
    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
    };

    /*  This will also clear up the error that React was throwing earlier, 
        because the onChange handler means that the value of this element
        can now potentially change and is no longer read-only. Test this out 
        in the browser by adding an item to the cart and then typing a new 
        number in the <input> element. Doing so will automatically update the 
        total dollar amount, because the parent Cart component re-renders whenever the global state is updated.*/
    const onChange = (e) => {
        const value = e.target.value;

        if(value === '0'){
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
        }
    };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;