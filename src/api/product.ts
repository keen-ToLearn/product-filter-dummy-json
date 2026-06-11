const baseURI = 'https://dummyjson.com';
const baseEndPoint = `${baseURI}/products`;

// Selected product data to fetch for display on List page
const fieldsToFetch = 'title,thumbnail,price,rating,brand';

export const getProduct = (productId: string) => fetch(`${baseEndPoint}/${productId}`);

export const getProductsByQuery = (query: string, limit: number, skip: number) =>
    fetch(`${baseEndPoint}/search?q=${query}&limit=${limit}&skip=${skip}&select=${fieldsToFetch}`);

export const getProductsByRange = (limit: number, skip: number) =>
    fetch(`${baseEndPoint}?limit=${limit}&skip=${skip}&select=${fieldsToFetch}`);

export const getAllCategories = () => fetch(`${baseEndPoint}/categories`);

export const getProductsByCategory = (category: string) =>
    fetch(`${baseEndPoint}/category/${category}?select=${fieldsToFetch}`);