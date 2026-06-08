import { createContext } from 'react';
import { type ProductContextType } from './type';

// Default Value of the Product Context
const DefaultProductContextValue = {};

// Exporting the Product Context to be used in Provider file
export const ProductContext = createContext<ProductContextType>(DefaultProductContextValue);