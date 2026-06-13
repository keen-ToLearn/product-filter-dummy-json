import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'

import { Navbar } from '../../pages'
import { ProductContext } from './ProductContext'
import {
    type PageConfigType,
    type BrandUpdaterType,
    type CategoryUpdaterType,
    type PriceUpdaterType,
    type ProductFilter,
    type QueryUpdaterType,
    type PageConfigUpdaterType,
    type AppliedPriceUpdaterType
} from '../../types/filters'
import {
    type ProductListRes,
    type ProductMapType,
    type ProductMapUpdaterType,
    type ProductSmallData
} from '../../types/product'
import { MapActions } from '../../types/enums'
import { defaultProductFilter } from './config'
import { useDebounce, useFetchCalls } from '../../hooks'
import { getProductsByQuery, getProductsByRange } from '../../api'
import { DefaultFetchSize, defaultProductPageConfig, getSkipCount, NoCategory } from '../../utils'

export const ProductProvider = () => {
    const isMounted = useRef<boolean>(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [productMap, setProductMap] = useState<ProductMapType>(new Map<string, ProductSmallData[]>());
    const [productFilter, setProductFilter] = useState<ProductFilter>(defaultProductFilter);
    const [pageConfig, setPageConfig] = useState<PageConfigType>(defaultProductPageConfig);

    const { performFetchCall } = useFetchCalls();
    const debouncer = useDebounce();

    useEffect(() => {
        resetFilters();
    }, []);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (productFilter.categoryCount === 0 && productFilter.query === '') {
            resetFilters();
        }
    }, [productFilter.categoryCount]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const updateProductMap: ProductMapUpdaterType = (action, category, productList) => {
        setProductMap(productMap => {
            const currentProductMap = new Map(productMap);

            if (action === MapActions.SET) {
                currentProductMap[action](category, productList);
            } else if (action === MapActions.DELETE) {
                currentProductMap[action](category);
            } else if (action === MapActions.CLEAR) {
                currentProductMap[action]();
                currentProductMap.set(category, productList);
            }

            return currentProductMap;
        });
    }

    const onResetProductAPISuccess = (data: ProductListRes) => {
        updateProductPageConfig({
            ...defaultProductPageConfig,
            total: data.total,
        });
        updateProductMap(MapActions.CLEAR, NoCategory, data.products);
    }

    const resetFilters = () => {
        setProductFilter(defaultProductFilter);

        performFetchCall({
            callMethod: getProductsByRange,
            callArgs: [ DefaultFetchSize, getSkipCount(defaultProductPageConfig.active) ],
            successCallback: onResetProductAPISuccess,
        });
    }

    const isFilterApplied = () => {
        const { priceApplied, categoryCount, brandCount } = productFilter;

        return (
            priceApplied.minPrice <= priceApplied.maxPrice ||
            categoryCount > 0 ||
            brandCount > 0
        )
    }

    const updateFilterQuery: QueryUpdaterType = (query) => {
        setProductFilter({
            ...defaultProductFilter,
            query
        });

        const fetchQueryProductArgs = {
            callMethod: getProductsByQuery,
            callArgs: [ query, DefaultFetchSize, getSkipCount(defaultProductPageConfig.active) ],
            successCallback: onResetProductAPISuccess,
        };

        debouncer(performFetchCall, 1000, fetchQueryProductArgs);
    }

    const updateFilterPrice: PriceUpdaterType = (key, price) => {
        setProductFilter(filters => ({
            ...filters,
            [key]: price,
        }));
    }

    const updateAppliedFilterPrice: AppliedPriceUpdaterType = (applied) => {
        setProductFilter(filters => ({
            ...filters,
            priceApplied: applied,
        }));
        updateProductPageConfig(defaultProductPageConfig);
    }

    const updateFilterCategory: CategoryUpdaterType = (action, category) => {
        setProductFilter(filters => {
            const currentCategorySet = new Set(filters.categorySet);
            currentCategorySet[action](category);

            return {
                ...filters,
                categorySet: currentCategorySet,
                categoryCount: currentCategorySet.size,
                query: defaultProductFilter.query,
            };
        });
        updateProductPageConfig(defaultProductPageConfig);
    }

    const updateFilterBrand: BrandUpdaterType = (action, brand) => {
        setProductFilter(filters => {
            const currentBrandSet = new Set(filters.brandSet);
            currentBrandSet[action](brand);

            return {
                ...filters,
                brandSet: currentBrandSet,
                brandCount: currentBrandSet.size,
            };
        });
        updateProductPageConfig(defaultProductPageConfig);
    }

    const updateProductPageConfig: PageConfigUpdaterType = (portion) => {
        setPageConfig(config => ({
            ...config,
            ...portion,
        }));
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
            updateAppliedFilterPrice,
            updateFilterCategory,
            updateFilterBrand,
            pageConfig,
            updateProductPageConfig,
        }}>
            {/* Navbar imported specifically in Product Provider only due to limited assignment scope */}
            <Navbar />
            <Outlet />
        </ProductContext.Provider>
    )
}