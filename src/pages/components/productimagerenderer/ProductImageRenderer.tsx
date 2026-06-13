import { useEffect, useState } from 'react'
import { type ProductImageRendererProps } from './types'

import { Pagination } from '../pagination'
import { defaultDetailPageConfig } from './config'
import { type PageConfigType } from '../../../types/filters'
import { VisiblePageCount } from '../../../utils'

import styles from './ProductImageRenderer.module.css'

export const ProductImageRenderer = ({ images }: ProductImageRendererProps) => {
    const [detailPageConfig, setDetailPageConfig] = useState<PageConfigType>(defaultDetailPageConfig)

    useEffect(() => {
        setDetailPageConfig({
            ...defaultDetailPageConfig,
            active: 1,
            total: images.length,
        })
    }, [])

    const handlePageChange = (now: number) => {
        setDetailPageConfig({
            ...detailPageConfig,
            active: now,
        })
    }

    return (
        <div className={styles['image-display-container']}>
            <figure className={styles['image-display-box']}>
                <img src={images[detailPageConfig.active - 1]} alt={'Product Image'} />
            </figure>
            {images.length > 1 && (
                <div className={styles['image-page-box']}>
                    <Pagination
                        active={detailPageConfig.active}
                        last={detailPageConfig.total}
                        visible={VisiblePageCount}
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}