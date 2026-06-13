import { useContext, useEffect, useMemo, useState } from 'react'

import { ProductContext } from '../../../../providers'
import { SetActions } from '../../../../types/enums'
import { NoCategory } from '../../../../utils'

import styles from './BrandFilter.module.css'
import filterstyles from '../Filter.module.css'

export const BrandFilter = () => {
    const [brandList, setBrandList] = useState<string[]>([])

    const { productFilter, updateFilterBrand, productMap } = useContext(ProductContext)

    useEffect(() => {
        const brandSet = new Set<string>()
        const isFilteredByCategory = productFilter.categoryCount > 0

        if (isFilteredByCategory) {
            productFilter.categorySet.forEach(category => {
                const categoryProducts = productMap.get(category)
                categoryProducts?.forEach(product => {
                    if (product.brand?.length > 0) {
                        brandSet.add(product.brand)
                    }
                })
            })
        } else {
            const allProducts = productMap.get(NoCategory)
            allProducts?.forEach(product => {
                if (product.brand?.length > 0) {
                    brandSet.add(product.brand)
                }
            })
        }

        setBrandList([ ...brandSet ])
    }, [productMap, productFilter.categoryCount])

    const renderBrandList = useMemo(() => {
        return brandList.map((brand, i) => {
            const isChecked = productFilter.brandSet.has(brand)
            const action = isChecked ? SetActions.DELETE : SetActions.ADD

            return (
                <div
                    key={`${brand}-${i}`}
                    className={filterstyles['check-item']}
                    onClick={() => updateFilterBrand(action, brand)}
                >
                    <input type='checkbox' name={brand} checked={isChecked} readOnly />
                    <label>{brand}</label>
                </div>
            )
        })
    }, [brandList, productFilter.brandSet])

    return (
        <div className={`${filterstyles['filter-container']} ${styles['brand-box']}`}>
            <div className={filterstyles['head-box']}>
                <h4>Brands</h4>
                <em>{'(apply on loaded products)'}</em>
            </div>
            {renderBrandList}
        </div>
    )
}