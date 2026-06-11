import { useContext, useEffect, useMemo, useState } from 'react';

import { AppContext, ProductContext } from '../../../../providers';
import { getAllCategories, getProductsByCategory } from '../../../../api';
import { type CategoryResType } from './types';
import { type ProductListRes } from '../../../../types/product';
import { MapActions, SetActions } from '../../../../types/enums';
import { SetToMapAction } from '../helper';

import filterstyles from '../Filter.module.css';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
    const { performFetchCall } = useContext(AppContext);
    const { productFilter, updateFilterCategory, updateProductMap } = useContext(ProductContext);

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

    const onProductByCategoryAPISuccess = (data: ProductListRes, action: MapActions, category: string) => {
        updateProductMap(action, category, data.products);
    }

    const handleCategoryCheck = (isChecked: boolean, category: string) => {
        const action = isChecked ? SetActions.DELETE : SetActions.ADD;

        performFetchCall({
            callMethod: getProductsByCategory,
            callArgs: [ category ],
            successCallback: (data: ProductListRes) => {
                updateFilterCategory(action, category);
                onProductByCategoryAPISuccess(data, SetToMapAction[action], category);
            }
        });
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