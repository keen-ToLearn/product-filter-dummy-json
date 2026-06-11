import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import { type ErrorAlertProps } from './types';

import styles from './ErrorAlert.module.css';

export const ErrorAlert = ({ message, showErrorMessage }: ErrorAlertProps) => {
    return (
        <div className='overlay'>
            <div className={styles['error-box']}>
                <FontAwesomeIcon icon={faTriangleExclamation} size={'3x'} className={styles['error-icon']} />
                <h4>{message}</h4>
                <button
                    autoFocus
                    className='app-btn error-btn large all-round'
                    onClick={() => showErrorMessage('')}
                    onKeyDown={() => showErrorMessage('')}
                >
                    OK
                </button>
            </div>
        </div>
    )
}