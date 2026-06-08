import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from '../searchinput';
import styles from './Navbar.module.css';

const commonIconStyle = { color: 'rgb(255, 255, 255)' };

export const Navbar = () => {
    return (
        <nav className={styles['navbar']}>
            <div>
                <button>
                    <FontAwesomeIcon role={'button'} icon={faBars} style={commonIconStyle} />
                </button>
            </div>
            <SearchInput placeHolder={'Search Products...'} />
            <div className={styles['right-nav-item']}>
                <button>
                    <FontAwesomeIcon role={'button'} icon={faCartShopping} style={commonIconStyle} />
                </button>
                <button>
                    <FontAwesomeIcon role={'button'} icon={faUser} style={commonIconStyle} />
                </button>
            </div>
        </nav>
    )
}