import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState('admin')
    const [password, setPassword] = useState('admin')

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleChangeUsername = (e: any) => {
        setUserName(e.target.value);
    };
    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    };
    const handleClickLogin = async (event: any) => {
        event.preventDefault()
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
                email: userName,
                password
            })
            .then(response => {
                Cookies.set('authToken', response.data.token, { path: '/' })
                Cookies.set('refreshToken', response.data.refreshToken, { path: '/' })
                if (response.data) {
                    toast({
                        title: 'Thành công',
                        description: "Đăng nhập thành công",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate('/sell')
                }
            })
            .catch(err => {

                toast({
                    title: 'Lỗi',
                    description: err,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

            })
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Xin Chào</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="Tên tài khoản" value={userName} onChange={handleChangeUsername} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}

                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                onClick={handleClickLogin}
                            >
                                Đăng nhập
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            {/* <Box>
                New to us?{" "}
                <Link color="teal.500" href="#">
                    Sign Up
                </Link>
            </Box> */}
        </Flex>
    );
};

export default Login;
