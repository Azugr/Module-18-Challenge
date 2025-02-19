import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks.js";
import SavedBooks from "./pages/SavedBooks.js";
import Navbar from "./components/Navbar.js";

import "./App.css";

console.log(import.meta.env); // Check if the env variables are being loaded


// ✅ Create Apollo Client using the correct API URL
const client = new ApolloClient({
  uri: `${API_URL}/graphql`, // ✅ Use deployed backend instead of localhost
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem("id_token")}` || "",
  },
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </>
    </ApolloProvider>
  );
}

export default App;

