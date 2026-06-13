import { useNavigate } from 'react-router'

import { Rating } from '../rating'
import { type ProductCardProps, type RightContentInfoType } from './types'

import styles from './ProductCard.module.css'

export const ProductCard = ({
    id,
    title,
    imageURI,
    footerInfo,
}: ProductCardProps) => {
    const navigate = useNavigate()

    const getRightFooterContent = (rightInfo: RightContentInfoType) => {
        if (rightInfo.contentType === 'rating') {
            return (
                <Rating content={rightInfo.content} size={'sm'} outof={5} />
            )
        }

        return (
            <></>
        )
    }

    return (
        <button type='button' className={styles['product-card']} onClick={() => navigate(id.toString())}>
            <figure className={styles['card-image-box']}>
                <img src={imageURI} alt={title} />
            </figure>
            <div className={styles['card-main']}>
                <div className={styles['card-title-box']}>
                    <h4>{title}</h4>
                </div>
                <div className={styles['card-footer']}>
                    <div>{footerInfo.left}</div>
                    <div>{getRightFooterContent(footerInfo.right)}</div>
                </div>
            </div>
        </button>
    )
}