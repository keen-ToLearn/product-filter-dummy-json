import { Outlet } from 'react-router'
import { ProductContext } from './ProductContext'
// import { type ProductProviderProps } from './type'

export const ProductProvider = () => {
// export const ProductProvider = ({ children }: ProductProviderProps) => {
    return (
        <ProductContext.Provider value={{}}>
            <Outlet />
        </ProductContext.Provider>
    )
}