// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SearchBooks from './pages/SearchBooks';
// import SavedBooks from './pages/SavedBooks';
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <Router>
//       <>
//         <Navbar />
//         <Switch>
//           <Route exact path='/' component={SearchBooks} />
//           <Route exact path='/saved' component={SavedBooks} />
//           <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
//         </Switch>
//       </>
//     </Router>
//   );
// }

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./pages/AllRoutes";
import Auth from "./components/Auth";


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <Auth>
              <AllRoutes />
            </Auth>
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
