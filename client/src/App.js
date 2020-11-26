import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";

import TodoContainer from "./components/TodoContainer";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App() {
  return (
  <ApolloProvider client={client}>
    <TodoContainer />
  </ApolloProvider>
  )  
}

export default App;
