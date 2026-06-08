import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { type SearchInputProps } from './types';
import styles from './SearchInput.module.css';

export const SearchInput = ({ placeHolder }: SearchInputProps) => {
    return (
        <div className={styles['search-field-container']}>
            <input
                type={'text'}
                name='search-product'
                className={styles['search-field']}
                placeholder={placeHolder}
            />
            <figure className={styles['search-icon']}>
                <FontAwesomeIcon role={'button'} icon={faSearch} />
            </figure>
        </div>
    )
}