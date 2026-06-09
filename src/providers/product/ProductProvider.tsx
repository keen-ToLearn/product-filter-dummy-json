import { Outlet } from 'react-router'
import { ProductContext } from './ProductContext'
import { Navbar } from '../../pages'

export const ProductProvider = () => {
    return (
        <ProductContext.Provider value={{}}>
            <Navbar />
            <Outlet />
        </ProductContext.Provider>
    )
}