const baseURI = 'https://dummyjson.com';
const baseEndPoint = `${baseURI}/products`;

export const getAllProducts = () => fetch(baseEndPoint);

export const getProduct = (productId: string) => fetch(`${baseEndPoint}/${productId}`);

// Add limit, skip, select
export const getProductsByQuery = (query: string) => fetch(`${baseEndPoint}/search?q=${query}`);

// Accept config instead of parameters
export const getProductsByRange = (limit: number, skip: number, fields: string) =>
    fetch(`${baseEndPoint}?limit=${limit}&skip=${skip}&select=${fields}`);

export const getAllCategories = () => fetch(`${baseEndPoint}/categories`);

export const getProductsByCategory = (category: string) =>
    fetch(`${baseEndPoint}/category/${category}`);