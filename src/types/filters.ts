import { SetActions } from './enums';

export type ProductFilter = {
    query: string;
    categorySet: Set<string>;
    minPrice: string;
    maxPrice: string;
    priceApplied: boolean;
    brandSet: Set<string>;
}

export type QueryUpdaterType = (query: string) => void

type PriceKeys = 'minPrice' | 'maxPrice'

export type PriceUpdaterType = (key: PriceKeys, price: string) => void

export type CategoryUpdaterType = (action: SetActions, category: string) => void

export type BrandUpdaterType = (action: SetActions, brand: string) => void