export interface ProductSmallData {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
    brand: string;
}

export type ProductMapType = Map<string, ProductSmallData[]>

type MapActions = 'set' | 'delete'

export type ProductMapUpdaterType = (action: MapActions, category: string, productList?: ProductSmallData[]) => void