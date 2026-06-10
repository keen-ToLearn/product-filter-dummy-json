import { useState } from 'react'
import { Outlet } from 'react-router'

import { Navbar } from '../../pages'
import { ProductContext } from './ProductContext'
import {
    type BrandUpdaterType,
    type CategoryUpdaterType,
    type PriceUpdaterType,
    type ProductFilter,
    type QueryUpdaterType
} from '../../types/filters'
import {
    type ProductMapType,
    type ProductMapUpdaterType,
    type ProductSmallData
} from '../../types/product'
import { defaultProductFilter } from './config'

export const ProductProvider = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [productMap, setProductMap] = useState<ProductMapType>(new Map<string, ProductSmallData[]>());
    const [productFilter, setProductFilter] = useState<ProductFilter>(defaultProductFilter);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const updateProductMap: ProductMapUpdaterType = (action, category, productList) => {
        setProductMap(productMap => {
            if (action === 'set') {
                productMap[action](category, productList);
            } else if (action === 'delete') {
                productMap[action](category);
            }

            return productMap;
        });
    }

    const resetFilters = () => {
        setProductFilter(filters => ({
            ...defaultProductFilter,
            query: filters.query,
        }));
    }

    const updateFilterQuery: QueryUpdaterType = (query) => {
        setProductFilter(filters => ({
            ...filters,
            query
        }));
    }

    const updateFilterPrice: PriceUpdaterType = (key, price) => {
        setProductFilter(filters => ({
            ...filters,
            [key]: price,
        }));
    }

    const updateFilterCategory: CategoryUpdaterType = (action, category) => {
        setProductFilter(filters => {
            const currentCategorySet = new Set(filters.categorySet);
            currentCategorySet[action](category);

            return {
                ...filters,
                categorySet: currentCategorySet,
            };
        });
    }

    const updateFilterBrand: BrandUpdaterType = (action, brand) => {
        setProductFilter(filters => {
            const currentBrandSet = new Set(filters.brandSet);
            currentBrandSet[action](brand);

            return {
                ...filters,
                brandSet: currentBrandSet,
            };
        });
    }

    return (
        <ProductContext.Provider value={{
            isDrawerOpen,
            toggleDrawer,
            productMap,
            updateProductMap,
            productFilter,
            resetFilters,
            updateFilterQuery,
            updateFilterPrice,
            updateFilterCategory,
            updateFilterBrand,
        }}>
            {/* Navbar imported specifically in Product Provider only due to limited assignment scope */}
            <Navbar />
            <Outlet />
        </ProductContext.Provider>
    )
}