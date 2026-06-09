import { useContext } from 'react'
import { useNavigate } from 'react-router'

import { Drawer } from '../components'
import { ProductContext } from '../../providers'

import styles from './ProductList.module.css'

export const ProductList = () => {
    const navigate = useNavigate();

    const { isDrawerOpen } = useContext(ProductContext);

    return (
        <section className={styles['product-page']}>
            <Drawer />
            <section className={`${styles['list-box']} ${isDrawerOpen ? styles['open'] : ''}`}>
                <h1>Product List</h1>
                <button onClick={() => navigate('/product/12')}>To Product</button>
            </section>
        </section>
    )
}