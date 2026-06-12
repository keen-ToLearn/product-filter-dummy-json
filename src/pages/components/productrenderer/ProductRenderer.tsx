import React, { useContext, useEffect, useState } from 'react'

import { ProductCard } from '../productcard'
import { ProductContext } from '../../../providers'
import { type ProductSmallData } from '../../../types/product'
import { getDataRangeForPage, NoCategory } from '../../../utils'

import styles from './ProductRenderer.module.css'

export const ProductRenderer = () => {
// Rendering Logic
// Pagination Invoke
// Provide page change handler to pagination
    const [products, setProducts] = useState<ProductSmallData[]>([])

    const {
        productMap,
        productFilter,
        pageConfig,
        isFilterApplied,
    } = useContext(ProductContext)

    useEffect(() => {
        let newProducts: ProductSmallData[] = []

        const {
            categoryCount,
            categorySet,
            priceApplied,
            brandCount,
            brandSet,
        } = productFilter
        const isFilteredByCategory = categoryCount > 0

        if (isFilteredByCategory) {
            categorySet.forEach(category => {
                const categoryProducts = productMap.get(category)

                if (categoryProducts && Array.isArray(categoryProducts)) {
                    newProducts.push(...categoryProducts)
                }
            })
        } else {
            const allProducts = productMap.get(NoCategory)

            if (allProducts && Array.isArray(allProducts)) {
                newProducts.push(...allProducts)
            }
        }

        if (isFilterApplied()) {
            const { minPrice, maxPrice } = priceApplied
            const isFilteredByPrice = minPrice <= maxPrice
            const isFilteredByBrand = brandCount > 0

            if (isFilteredByPrice) {
                newProducts = newProducts.filter(({ price }) => price <= maxPrice && price >= minPrice)
            }
            if (isFilteredByBrand) {
                newProducts = newProducts.filter(({ brand }) => brandSet.has(brand))
            }
        }

        setProducts(newProducts.reverse())
        // setProducts(newProducts)
    }, [productMap, productFilter])

    if (products.length === 0) {
        return (
            <></>
        )
    }

    const renderProductList = getDataRangeForPage(pageConfig.active).map((num, i) => {
        const product = products[num]

        if (!product) {
            return <React.Fragment key={i}></React.Fragment>
        }

        const LeftContent = (
            <h4>${product.price}</h4>
        )

        return (
            <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageURI={product.thumbnail}
                footerInfo={{
                    left: LeftContent,
                    right: {
                        contentType: 'rating',
                        content: product.rating,
                    },
                }}
            />
        )
    })

    return (
        <div>
            <div className={styles['product-box']}>
                {renderProductList}
            </div>
        </div>
    )
}