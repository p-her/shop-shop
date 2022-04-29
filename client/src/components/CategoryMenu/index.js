import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

function CategoryMenu({ setCategory }) {

    /* 
        Now when we use this component, we immediately call upon the useStoreContext() Hook to retrieve 
        the current state from the global state object and the dispatch() method to update state. 
        Because we only need the categories array out of our global state, we simply destructure it out 
        of state so we can use it to provide to our returning JSX

        Now, we still don't actually have any data in state yet. We need to somehow take the categoryData 
        that returns from the useQuery() Hook and use the dispatch() method to set our global state.
        How can we do that if useQuery() is an asynchronous function? We can't simply just add the dispatch()
        method below it, as categoryData won't exist on load!

        Instead, we need to use the React useEffect() Hook, which was created specifically for times like this
    
    */
    const [state, dispatch] = useStoreContext();
    const { categories } = state;
    const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  

    /* 
        Now when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that categoryData is not undefined 
        anymore and runs the dispatch() function, setting our category data to the global state!
    
        useEffect() function takes two arguments, a function to run given a certain condition, and then the condition.

        In this case, the function runs immediately on load and passes in our function to update the global state and then the data that we're 
        dependent on, categoryData and dispatch. Now, categoryData is going to be undefined on load because the useQuery() Hook isn't done with its
        request just yet, meaning that if statement will not run.

        But the beauty of the useEffect() Hook is that it not only runs on component load, but also when some form of state changes in that component. 
        So when useQuery() finishes, and we have data in categoryData, the useEffect() Hook runs again and notices that categoryData exists! Because of that, 
        it does its job and executes the dispatch() function.
    */
    useEffect(() => {
        // if categoryData exists or has changed from the response
        // of useQuery, then run dispatch()
        if(categoryData) {
            // execute our dispatch function with our action object indicating
            // the type of action and the data to set our state for categories to
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories
            });
        }
    }, [categoryData, dispatch])


    /*  click handler to update our global state instead of using the function
        we receive as a prop from the Home component
    */
    const handleClick = id => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
    };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id); // use to be {setCategory(item._id)}
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
