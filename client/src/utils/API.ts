import { API_URL, GOOGLE_BOOKS_API_KEY } from "../config.js";

console.log("✅ API_URL Loaded:", API_URL);
console.log("✅ Using Google Books API Key:", GOOGLE_BOOKS_API_KEY);

// ✅ Function to Fetch Google Books API
export const searchGoogleBooks = async (query: string) => {
  if (!GOOGLE_BOOKS_API_KEY) {
    console.error("❌ Missing Google Books API Key. Check your .env file.");
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Books API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Google Books API Error:", error);
    return null;
  }
};

// ✅ Function to Fetch GraphQL API
export const fetchGraphQL = async (query: string, variables = {}) => {
  console.log("✅ Using API_URL for GraphQL:", API_URL); // Debugging

  try {
    const response = await fetch(`${API_URL}/graphql`, { // ✅ Use API_URL here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ GraphQL API Error:", error);
    return null;
  }
};
