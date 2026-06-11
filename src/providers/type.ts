import { type DoFetchCallFuncType } from '../hooks';
import {
    type BrandUpdaterType,
    type CategoryUpdaterType,
    type PriceUpdaterType,
    type ProductFilter,
    type QueryUpdaterType
} from '../types/filters';
import {
    type ProductMapType,
    type ProductMapUpdaterType
} from '../types/product';

export interface AppContextType {
    performFetchCall: DoFetchCallFuncType;
}

export interface ProductContextType {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
    productMap: ProductMapType;
    updateProductMap: ProductMapUpdaterType;
    productFilter: ProductFilter;
    resetFilters: () => void;
    isFilterApplied: () => boolean;
    updateFilterQuery: QueryUpdaterType;
    updateFilterPrice: PriceUpdaterType;
    updateFilterCategory: CategoryUpdaterType;
    updateFilterBrand: BrandUpdaterType;
}

export interface LoaderContextType {
    toggleLoader: () => void;
}

export interface ErrorAlertContextType {
    showErrorMessage: (message: string) => void;
}
