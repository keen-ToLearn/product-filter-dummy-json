import { useContext } from 'react'

import { AmountInput } from '../../input'
import { PriceKeys } from '../../../../types/enums'
import { ProductContext } from '../../../../providers'

import styles from './PriceFilter.module.css'
import filterstyles from '../Filter.module.css'

export const PriceFilter = () => {
    const { productFilter, updateAppliedFilterPrice } = useContext(ProductContext)

    const handleApplyClick = () => {
        const numMinPrice = Number(productFilter.minPrice)
        const numMaxPrice = Number(productFilter.maxPrice)

        if ((numMinPrice === 0 && numMaxPrice === 0) || numMinPrice > numMaxPrice) {
            return
        }

        updateAppliedFilterPrice({
            minPrice: numMinPrice,
            maxPrice: numMaxPrice,
        })
    }

    return (
        <div className={`${filterstyles['filter-container']}`}>
            <div className={styles['head-box']}>
                <h4>Price Range</h4>
                <em>{'(apply on loaded products)'}</em>
            </div>
            <div className={styles['price-field-box']}>
                <AmountInput
                    fieldKey={PriceKeys.MIN_PRICE}
                    value={productFilter.minPrice}
                    placeHolder={'Min'}
                />
                <AmountInput
                    fieldKey={PriceKeys.MAX_PRICE}
                    value={productFilter.maxPrice}
                    placeHolder={'Max'}
                />
            </div>
            <div className={styles['apply-box']}>
                <button
                    type='button'
                    className='app-btn all-round large full-width primary-btn'
                    onClick={handleApplyClick}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}