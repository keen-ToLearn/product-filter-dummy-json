import { type PageConfigType, type ProductFilter } from '../../types/filters';

export const defaultProductFilter: ProductFilter = {
    query: '',
    categorySet: new Set<string>(),
    categoryCount: 0,
    minPrice: '',
    maxPrice: '',
    priceApplied: {
        minPrice: 1,
        maxPrice: 0,
    },
    brandSet: new Set<string>(),
    brandCount: 0,
}

export const defaultProductPageConfig: PageConfigType = {
    total: 0,
    active: 1,
    lastFetchMin: 1,
    lastFetchMax: 5,
}