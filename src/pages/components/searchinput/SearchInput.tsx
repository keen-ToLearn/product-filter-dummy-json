import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ProductContext } from '../../../providers';
import { type SearchInputProps } from './types';

import styles from './SearchInput.module.css';

export const SearchInput = ({ placeHolder }: SearchInputProps) => {
    const { updateFilterQuery, productFilter } = useContext(ProductContext);

    return (
        <div className={styles['search-field-container']}>
            <input
                type={'text'}
                name='search-product'
                className={styles['search-field']}
                placeholder={placeHolder}
                value={productFilter.query}
                onChange={(event) => updateFilterQuery(event.target.value)}
                autoComplete='off'
            />
            <figure className={styles['search-icon']}>
                <FontAwesomeIcon role={'button'} icon={faSearch} />
            </figure>
        </div>
    )
}