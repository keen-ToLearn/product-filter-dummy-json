import { useContext, useEffect, useMemo, useState } from 'react';

import { AppContext, ProductContext } from '../../../../providers';
import { getAllCategories } from '../../../../api';
import { type CategoryResType } from './types';

import filterstyles from '../Filter.module.css';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
    const { performFetchCall } = useContext(AppContext);
    const { productFilter, updateFilterCategory } = useContext(ProductContext);

    const [categoryList, setCategoryList] = useState<CategoryResType>([]);

    useEffect(() => {
        const onCategoryAPISuccess = (data: CategoryResType) => {
            setCategoryList(data);
        }

        performFetchCall({
            callMethod: getAllCategories,
            successCallback: onCategoryAPISuccess,
        });
    }, []);

    const handleCategoryCheck = (isChecked: boolean, category: string) => {
        const action = isChecked ? 'delete' : 'add';
        
        updateFilterCategory(action, category);
    }

    const renderCategoryList = useMemo(() => {
        return categoryList.map((category, i) => {
            const isChecked = productFilter.categorySet.has(category.slug);

            return (
                <div
                    key={`${category.slug}-${i}`}
                    className={styles['category-item']}
                    onClick={() => handleCategoryCheck(isChecked, category.slug)}
                >
                    <input type='checkbox' name={category.name} checked={isChecked} readOnly />
                    <label>{category.name}</label>
                </div>
            )
        });
    }, [categoryList, productFilter.categorySet]);

    return (
        <div className={`${filterstyles['filter-container']} ${styles['category-box']}`}>
            <h4 className={filterstyles['type-heading']}>Categories</h4>
            {renderCategoryList}
        </div>
    )
}