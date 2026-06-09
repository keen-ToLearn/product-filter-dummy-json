import { useContext, useEffect } from 'react';

import { AppContext } from '../../../../providers';
import { getAllCategories } from '../../../../api';

import filterstyles from '../Filter.module.css';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
    const { performFetchCall } = useContext(AppContext);

    useEffect(() => {
        performFetchCall({
            callMethod: getAllCategories,
            successCallback: (data) => console.log(data),
        });
    }, []);

    return (
        <div className={filterstyles['filter-container']}>
            <h4 className={styles['type-heading']}>Categories</h4>
        </div>
    )
}