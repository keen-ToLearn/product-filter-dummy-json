import { useContext } from 'react'

import { SearchInput } from '../searchinput'
import { CategoryFilter } from '../filters'
import { ProductContext } from '../../../providers'

import styles from './Drawer.module.css'

export const Drawer = () => {
    const { isDrawerOpen } = useContext(ProductContext);

    return (
        <aside className={`${styles['filter-drawer']} ${isDrawerOpen ? styles['open'] : ''}`}>
            <div className={styles['filter-container']}>
                <SearchInput placeHolder={'Search...'} />
            </div>
            <CategoryFilter />
        </aside>
    )
}