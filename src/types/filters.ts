import { PriceKeys, SetActions } from './enums';

type PriceAppliedType = {
    minPrice: number;
    maxPrice: number;
}

export type ProductFilter = {
    query: string;
    categorySet: Set<string>;
    categoryCount: number;
    minPrice: string;
    maxPrice: string;
    priceApplied: PriceAppliedType;
    brandSet: Set<string>;
    brandCount: number;
}

export type QueryUpdaterType = (query: string) => void

export type PriceUpdaterType = (key: PriceKeys, price: string) => void

export type AppliedPriceUpdaterType = (applied: PriceAppliedType) => void

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