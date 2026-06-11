import { useEffect, useState } from 'react'
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
    type PageConfigUpdaterType
} from '../../types/filters'
import {
    type ProductListRes,
    type ProductMapType,
    type ProductMapUpdaterType,
    type ProductSmallData
} from '../../types/product'
import { MapActions } from '../../types/enums'
import { defaultProductFilter, NoCategory } from './config'
import { useDebounce, useFetchCalls } from '../../hooks'
import { getProductsByQuery, getProductsByRange } from '../../api'
import { defaultProductPageConfig, getSkipCount } from '../../utils'

export const ProductProvider = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [productMap, setProductMap] = useState<ProductMapType>(new Map<string, ProductSmallData[]>());
    const [productFilter, setProductFilter] = useState<ProductFilter>(defaultProductFilter);
    const [pageConfig, setPageConfig] = useState<PageConfigType>(defaultProductPageConfig);

    const { performFetchCall } = useFetchCalls();
    const debouncer = useDebounce();

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
            callArgs: [ pageConfig.limit, getSkipCount(defaultProductPageConfig.active) ],
            successCallback: onResetProductAPISuccess,
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

        const fetchQueryProductArgs = {
            callMethod: getProductsByQuery,
            callArgs: [ query, pageConfig.limit, getSkipCount(defaultProductPageConfig.active) ],
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
            updateFilterCategory,
            updateFilterBrand,
            updateProductPageConfig,
        }}>
            {/* Navbar imported specifically in Product Provider only due to limited assignment scope */}
            <Navbar />
            <Outlet />
        </ProductContext.Provider>
    )
}