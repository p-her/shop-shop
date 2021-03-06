/* 

The Home page component keeps track of the current category we are viewing.

The CategoryMenu component keeps track of our category list from an Apollo query.

The ProductList component displays products from an Apollo query.
*/


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';// make our global state available to all of our components
import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            {/* 
                Note that we use the <StoreProvider> to wrap all of the components. All the components between those JSX tags are
                considered the children of <StoreProvider>; that's why it was so important that we had ...props in the definition 
                of the StoreProvider function!
            */}
            <StoreProvider>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/orderHistory" component={OrderHistory} />
                    <Route exact path="/products/:id" component={Detail} />
                    <Route component={NoMatch} />
                </Switch>

                
            </StoreProvider>
      
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
