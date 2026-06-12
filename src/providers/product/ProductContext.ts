import { createContext } from 'react';
import { type ProductContextType } from '../type';

// Default Value of the Product Context
const defaultProductContextValue: ProductContextType = {
    isDrawerOpen: false,
    toggleDrawer: () => {},
    productMap: null,
    updateProductMap: () => {},
    productFilter: null,
    resetFilters: () => {},
    isFilterApplied: () => false,
    updateFilterQuery: () => {},
    updateFilterPrice: () => {},
    updateAppliedFilterPrice: () => {},
    updateFilterCategory: () => {},
    updateFilterBrand: () => {},
    pageConfig: null,
    updateProductPageConfig: () => {},
};

// Exporting the Product Context to be used in Provider file
export const ProductContext = createContext<ProductContextType>(defaultProductContextValue);