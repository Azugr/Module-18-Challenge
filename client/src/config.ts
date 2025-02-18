const API_URL: string = import.meta.env.VITE_API_URL || "https://module-18-challenge.onrender.com";
const GOOGLE_BOOKS_API_KEY: string = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || "";

console.log("🔍 Loaded API URL:", API_URL); 
console.log("🔍 Loaded Google Books API Key:", GOOGLE_BOOKS_API_KEY);

export { API_URL, GOOGLE_BOOKS_API_KEY };
