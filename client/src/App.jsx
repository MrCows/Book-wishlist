import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up the context to attach JWT from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client with the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Attach authLink to httpLink
  cache: new InMemoryCache(),  // Use in-memory cache for state management
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;