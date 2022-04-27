import React from 'react';
import './index.css';
import App from './components/App';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import { getCredentials } from './common';
import withSession from './components/withSession';

const httpLink = new HttpLink({ uri: 'http://127.0.0.1:4444/graphql/' });
const authLink = new ApolloLink((operation, forward) => {
  const token = getCredentials();
  operation.setContext({ headers: { authorization: token } });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    console.log('operation: ', operation);
    operation.setContext({
      headers: {
        authorization: getCredentials(),
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network error', networkError);
    }
  }
});

const RoutingRoot = ({ refetch }) => (
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn refetch={refetch} />}  />
      <Route path="/signup" element={<SignUp refetch={refetch} />} />
      <Route path="*" exact element={<App />} />
    </Routes>
  </Router>
);

const RoutingRootWithSession = withSession(RoutingRoot);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoutingRootWithSession />
    </ApolloProvider>
  </React.StrictMode>,
);