import { useEffect, useState } from 'react'
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
    type ProductListRes,
    type ProductMapType,
    type ProductMapUpdaterType,
    type ProductSmallData
} from '../../types/product'
import { MapActions } from '../../types/enums'
import { defaultProductFilter, NoCategory } from './config'
import { useFetchCalls } from '../../hooks'
import { getProductsByRange } from '../../api'

export const ProductProvider = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [productMap, setProductMap] = useState<ProductMapType>(new Map<string, ProductSmallData[]>());
    const [productFilter, setProductFilter] = useState<ProductFilter>(defaultProductFilter);

    const { performFetchCall } = useFetchCalls();

    useEffect(() => {
        resetFilters();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const updateProductMap: ProductMapUpdaterType = (action, category, productList) => {
        setProductMap(productMap => {
            if (action === MapActions.SET) {
                productMap[action](category, productList);
            } else if (action === MapActions.DELETE) {
                productMap[action](category);
            } else if (action === MapActions.CLEAR) {
                productMap[action]();
                productMap.set(category, productList);
            }

            return productMap;
        });
    }

    const onProductRangeAPISuccess = (data: ProductListRes) => {
        updateProductMap(MapActions.CLEAR, NoCategory, data.products);
        // commit code add pagination state, defaults, lastFetchMin, lastFetchMax
    }

    const resetFilters = () => {
        setProductFilter(defaultProductFilter);

        performFetchCall({
            callMethod: getProductsByRange,
            callArgs: [32, 0],
            successCallback: onProductRangeAPISuccess,
        });
    }

    const isFilterApplied = () => {
        const { priceApplied, categorySet, brandSet } = productFilter;

        return (
            priceApplied ||
            categorySet.size > 0 ||
            brandSet.size > 0
        )
    }

    const updateFilterQuery: QueryUpdaterType = (query) => {
        setProductFilter({
            ...defaultProductFilter,
            query
        });
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
                query: defaultProductFilter.query,
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
            isFilterApplied,
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