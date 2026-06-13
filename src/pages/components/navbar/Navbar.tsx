import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import { SearchInput } from '../input';

import { ProductContext } from '../../../providers';

import styles from './Navbar.module.css';

const commonIconStyle = { color: 'rgb(255, 255, 255)' };

export const Navbar = () => {
    const { toggleDrawer } = useContext(ProductContext);

    return (
        <nav className={styles['navbar']}>
            <div>
                <button onClick={toggleDrawer}>
                    <FontAwesomeIcon role={'button'} icon={faBars} style={commonIconStyle} />
                </button>
            </div>
            <div>
                <SearchInput placeHolder={'Search Products...'} />
            </div>
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