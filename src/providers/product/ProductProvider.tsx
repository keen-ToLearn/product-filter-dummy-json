import { useState } from 'react'
import { Outlet } from 'react-router'
import { ProductContext } from './ProductContext'
import { Navbar } from '../../pages'

export const ProductProvider = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <ProductContext.Provider value={{
            isDrawerOpen,
            toggleDrawer,
        }}>
            <Navbar />
            <Outlet />
        </ProductContext.Provider>
    )
}