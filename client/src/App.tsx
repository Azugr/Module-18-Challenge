import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks.js";
import SavedBooks from "./pages/SavedBooks.js";
import Navbar from "./components/Navbar.js";

import "./App.css";

// ✅ Create an Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Connects to your GraphQL backend
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem("id_token")}` || "",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="*" element={<h1 className="display-2">404 - Page Not Found</h1>} />
        </Routes>
      </>
    </ApolloProvider>
  );
}

export default App;

