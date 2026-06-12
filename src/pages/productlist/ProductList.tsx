import { useContext } from 'react'

import { Drawer, ProductRenderer } from '../components'
import { ProductContext } from '../../providers'

import styles from './ProductList.module.css'

export const ProductList = () => {
    const { isDrawerOpen } = useContext(ProductContext);

    return (
        <section className={styles['product-page']}>
            <Drawer />
            <section className={`${styles['list-box']} ${isDrawerOpen ? styles['open'] : ''}`}>
                <ProductRenderer />
            </section>
        </section>
    )
}