import filterstyles from '../Filter.module.css';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
    return (
        <div className={filterstyles['filter-container']}>
            <h4 className={styles['type-heading']}>Categories</h4>
        </div>
    )
}