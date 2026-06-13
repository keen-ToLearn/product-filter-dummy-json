import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { type ProductFullData } from '../../types/product';
import { useFetchCalls } from '../../hooks';
import { getProduct } from '../../api';

import styles from './Product.module.css';
import { ProductImageRenderer, Rating } from '../components';

export const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { performFetchCall } = useFetchCalls();

    const [product, setProduct] = useState<ProductFullData | null>(null);

    useEffect(() => {
        const onProductAPISuccess = (data: ProductFullData) => {
            setProduct(data);
        }

        const path = location.pathname;
        const productId = path.substring(path.lastIndexOf('/') + 1);

        if (productId.length > 0) {
            performFetchCall({
                callMethod: getProduct,
                callArgs: [ productId ],
                successCallback: onProductAPISuccess,
            });
        }
    }, []);

    const renderReviewList = (product?.reviews ?? []).map((review, i) => (
        <div key={`${review.date}-${i}`} className={styles['review-box']}>
            <div className={styles['rating-container']}>
                <h3>{review.reviewerName}</h3>
                <Rating content={review.rating} size={'1x'} outof={5} />
            </div>
            <p>{review.comment}</p>
        </div>
    ))

    return (
        <section className={styles['product-detail-page']}>
            <button
                type='button'
                className={`app-btn all-round large ${styles['back-button']}`}
                onClick={() => navigate('/product')}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back</span>
            </button>
            {product && (
                <div className={styles['detail-grid']}>
                    <ProductImageRenderer images={product.images}/>
                    <div className={styles['detail-info-box']}>
                        <h2>{product.title}</h2>
                        <div className={styles['cost-box']}>
                            <div className={styles['rating-container']}>
                                <h1>${product.price}</h1>
                                <Rating content={product.rating} size={'1x'} outof={5} />
                            </div>
                        </div>
                        <div className={styles['brand-desc-box']}>
                            <p>
                                <b>Brand:</b> {product.brand}
                            </p>
                            <p>
                                <b>Category:</b> {product.category?.toUpperCase()}
                            </p>
                        </div>
                        <div className={styles['brand-desc-box']}>
                            <h2 className={styles['desc-title']}>Description</h2>
                            <p>{product.description}</p>
                        </div>
                        <div className={styles['review-container']}>
                            <h2>Reviews</h2>
                            {renderReviewList}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}