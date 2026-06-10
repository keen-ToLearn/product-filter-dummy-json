import { useContext, useEffect, useMemo, useState } from 'react';

import { AppContext } from '../../../../providers';
import { getAllCategories } from '../../../../api';
import { type CategoryResType } from './types';

import filterstyles from '../Filter.module.css';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
    const { performFetchCall } = useContext(AppContext);

    const [categoryList, setCategoryList] = useState<CategoryResType>([]);

    useEffect(() => {
        console.log('Category Filter rendered');

        const onCategoryAPISuccess = (data: CategoryResType) => {
            setCategoryList(data);
        }

        performFetchCall({
            callMethod: getAllCategories,
            successCallback: onCategoryAPISuccess,
        });
    }, []);

    const renderCategoryList = useMemo(() => {
        return categoryList.map((category, i) => (
            <div key={`${category.slug}-${i}`} className={styles['category-item']}>
                <input type='checkbox' name={category.name} />
                <label>{category.name}</label>
            </div>
        ));
    }, [categoryList]);

    return (
        <div className={`${filterstyles['filter-container']} ${styles['category-box']}`}>
            <h4 className={filterstyles['type-heading']}>Categories</h4>
            {renderCategoryList}
        </div>
    )
}