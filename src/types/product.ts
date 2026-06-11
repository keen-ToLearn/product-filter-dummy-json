export interface ProductSmallData {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
    brand: string;
}

export type ProductMapType = Map<string, ProductSmallData[]>

export type MapActions = 'set' | 'delete'

export type ProductMapUpdaterType = (action: MapActions, category: string, productList?: ProductSmallData[]) => void

export interface ProductListRes {
    products: ProductSmallData[];
    limit: number;
    skip: number;
    total: number;
}