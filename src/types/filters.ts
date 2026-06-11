import { PriceKeys, SetActions } from './enums';

export type ProductFilter = {
    query: string;
    categorySet: Set<string>;
    minPrice: string;
    maxPrice: string;
    priceApplied: boolean;
    brandSet: Set<string>;
}

export type QueryUpdaterType = (query: string) => void

export type PriceUpdaterType = (key: PriceKeys, price: string) => void

export type CategoryUpdaterType = (action: SetActions, category: string) => void

export type BrandUpdaterType = (action: SetActions, brand: string) => void

export type PageConfigType = {
    total: number;
    active: number;
    lastFetchMin: number;
    lastFetchMax: number;
    limit: number;
}

export type PageConfigUpdaterType = (portion: Partial<PageConfigType>) => void