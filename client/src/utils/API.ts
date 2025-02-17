const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchGoogleBooks = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Google Books API request failed.");
    }

    return response.json();
  } catch (error) {
    console.error("Google Books API Error:", error);
    return null;
  }
};

