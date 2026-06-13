import React, { useContext, useEffect, useState } from 'react'

import { ProductCard } from '../productcard'
import { Pagination } from '../pagination'
import { ProductContext } from '../../../providers'
import { type ProductListRes, type ProductSmallData } from '../../../types/product'
import { getDataRangeForPage, getPageFetchRange, NoCategory, PerPage, VisiblePageCount } from '../../../utils'
import { useFetchCalls } from '../../../hooks'
import { getProductsByQuery } from '../../../api'

import styles from './ProductRenderer.module.css'
import { MapActions } from '../../../types/enums'

export const ProductRenderer = () => {
    const [products, setProducts] = useState<ProductSmallData[]>([])

    const {
        productMap,
        productFilter,
        pageConfig,
        isFilterApplied,
        updateProductPageConfig,
        updateProductMap,
    } = useContext(ProductContext)

    const { performFetchCall } = useFetchCalls()

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

        setProducts(newProducts)
    }, [productMap, productFilter])

    const onProductPageAPISuccess = (data: ProductSmallData[], limit: number, skip: number) => {
        const allProducts = productMap.get(NoCategory)
        const updatedAllProducts = [
            ...allProducts.slice(0, skip),
            ...data,
            ...allProducts.slice(limit + skip),
        ]
        updateProductMap(MapActions.SET, NoCategory, updatedAllProducts)
    }

    const handlePageChange = (now: number) => {
        if (now === pageConfig.active) {
            return
        }

        updateProductPageConfig({
            active: now,
        })

        if (!isFilterApplied()) {
            const { active, total } = pageConfig

            const lastPageForActive = Math.ceil(products.length / PerPage)
            const lastPageForNow = Math.ceil(total / PerPage)
            
            const { limit, skip } = getPageFetchRange(active, now, lastPageForActive, lastPageForNow, VisiblePageCount)

            // If limit and skip are 0 then no data can be fetched
            if (limit !== 0 && skip !== 0) {
                performFetchCall({
                    callMethod: getProductsByQuery,
                    callArgs: [ productFilter.query, limit, skip ],
                    successCallback: (data: ProductListRes) => {
                        onProductPageAPISuccess(data.products, data.limit, skip)
                    },
                    silent: true,
                })
            }
        }
    }

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
                key={`${product.id}-${i}`}
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
            <div className={styles['page-box']}>
                <Pagination
                    active={pageConfig.active}
                    visible={VisiblePageCount}
                    last={Math.ceil(products.length / PerPage)}
                    handlePageChange={handlePageChange}
                />
            </div>
            <div className={styles['product-box']}>
                {renderProductList}
            </div>
        </div>
    )
}