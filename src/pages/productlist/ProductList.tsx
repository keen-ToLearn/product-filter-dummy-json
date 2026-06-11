import { useContext } from 'react'

import { Drawer } from '../components'
import { ProductContext } from '../../providers'

import styles from './ProductList.module.css'

export const ProductList = () => {
    const { isDrawerOpen, productMap } = useContext(ProductContext);

    return (
        <section className={styles['product-page']}>
            <Drawer />
            <section className={`${styles['list-box']} ${isDrawerOpen ? styles['open'] : ''}`}>
                <div>
                    {JSON.stringify([ ...productMap.entries() ])}
                </div>
            </section>
        </section>
    )
}