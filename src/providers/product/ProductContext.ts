import { createContext } from 'react';
import { type ProductContextType } from '../type';
import { defaultProductFilter, defaultProductPageConfig } from './config';

// Default Value of the Product Context
const defaultProductContextValue: ProductContextType = {
    isDrawerOpen: false,
    toggleDrawer: () => {},
    productMap: new Map(),
    updateProductMap: () => {},
    productFilter: defaultProductFilter,
    resetFilters: () => {},
    isFilterApplied: () => false,
    updateFilterQuery: () => {},
    updateFilterPrice: () => {},
    updateAppliedFilterPrice: () => {},
    updateFilterCategory: () => {},
    updateFilterBrand: () => {},
    pageConfig: defaultProductPageConfig,
    updateProductPageConfig: () => {},
};

// Exporting the Product Context to be used in Provider file
export const ProductContext = createContext<ProductContextType>(defaultProductContextValue);