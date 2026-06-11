import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <div className='overlay'>
            <div className={styles['loader-box']}>
                <FontAwesomeIcon icon={faCircleNotch} spin size={'3x'} />
                <h4>Loading</h4>
            </div>
        </div>
    )
}