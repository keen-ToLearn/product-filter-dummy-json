import { type ProductFilter } from '../../types/filters';

export const defaultProductFilter: ProductFilter = {
    query: '',
    categorySet: new Set<string>(),
    minPrice: '',
    maxPrice: '',
    brandSet: new Set<string>(),
}