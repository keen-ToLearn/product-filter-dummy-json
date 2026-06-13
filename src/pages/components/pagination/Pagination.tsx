import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { type PaginationProps } from './types'

import styles from './Pagination.module.css'
import { getPageButtonNumbers } from '../../../utils'

export const Pagination = ({
    active,
    last,
    visible,
    handlePageChange,
}: PaginationProps) => {
    const previousDisabled = useMemo(() => active === 1, [active])
    const nextDisabled = useMemo(() => active === last, [active, last])

    const renderPageButtons = getPageButtonNumbers(active, last, visible).map(num => (
        <button
            type='button'
            className={`app-btn all-round large ${active === num ? 'primary-btn' : ''} ${styles['page-button']}`}
            onClick={() => handlePageChange(num)}
        >
            {num}
        </button>
    ))

    return (
        <div className={styles['pagination-container']}>
            <button
                type='button'
                className={`app-btn all-round large ${previousDisabled ? 'disabled' : ''} ${styles['page-button']}`}
                disabled={previousDisabled}
                onClick={() => handlePageChange(active - 1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Previous</span>
            </button>
            {renderPageButtons}
            <button
                type='button'
                className={`app-btn all-round large ${nextDisabled ? 'disabled' : ''} ${styles['page-button']}`}
                disabled={nextDisabled}
                onClick={() => handlePageChange(active + 1)}
            >
                <span>Next</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    )
}