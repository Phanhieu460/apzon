import {
    IconButton
} from '@chakra-ui/react';
import Cookies from "js-cookie";
import { CiUser } from 'react-icons/ci';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <div className='header'>
            <div className='header__menu'>
                <NavLink to='/sell'>
                    {' '}
                    <span className={location.pathname === '/sell' ? 'active' : ''}>
                        Quản lý bán hàng
                    </span>
                </NavLink>
                <NavLink to='/buy'>
                    <span className={location.pathname === '/buy' ? 'active' : ''}>
                        Quản lý mua hàng
                    </span>
                </NavLink>
            </div>
            <div className='info'>
                <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<CiUser />}
                />
                <span style={{ cursor: 'pointer' }} onClick={() => {
                    Cookies.remove('authToken')
                    Cookies.remove('refreshToken')
                    navigate('/')
                }
                }>Log out</span>

            </div>
        </div>
    );
};

export default Header;
