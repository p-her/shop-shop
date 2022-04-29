/*
    The Home page component manages the state currentCategory, which
    is passed to the ProductList component as a prop and instructs which
    category's products should be retrieved using Apollo.To set that currentCategory 
    value, however, the setCategory callback function is passed to the CategoryMenu component 
    as a prop to be executed on a new category pick.
*/

import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {

  return (
    <div className="container">
      <CategoryMenu  />
      <ProductList  />
    </div>
  );
};

export default Home;
