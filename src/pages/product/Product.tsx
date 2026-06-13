import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { type ProductFullData } from '../../types/product';
import { useFetchCalls } from '../../hooks';
import { getProduct } from '../../api';

import styles from './Product.module.css';
import { ProductImageRenderer } from '../components';

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
                    <div></div>
                </div>
            )}
        </section>
    )
}