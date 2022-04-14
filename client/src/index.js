import React from 'react';
import './index.css';
import App from './components/App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://127.0.0.1:4444/graphql/',
});

const RoutingRoot = () => (
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" exact element={<App />} />
    </Routes>
  </Router>
);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RoutingRoot />
    </ApolloProvider>
  </React.StrictMode>,
);