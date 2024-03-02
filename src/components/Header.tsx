import {
    Box,
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from '@chakra-ui/react';
import { CiUser } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <div className='header__menu'>
                <NavLink to='/sell'> Quản lý bán hàng</NavLink>
                <NavLink to='/buy'>Quản lý mua hàng</NavLink>
            </div>
            <div className='info'>
                <Popover isLazy>
                    <PopoverTrigger>
                        <IconButton
                            isRound={true}
                            variant='solid'
                            colorScheme='teal'
                            aria-label='Done'
                            fontSize='20px'
                            icon={<CiUser />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>Admin</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>Logout</PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default Header;
