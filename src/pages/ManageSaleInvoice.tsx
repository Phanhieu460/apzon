import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Heading,
    TableContainer,
    Container,
    IconButton,
    Spinner,
    useToast,
    Button,
} from '@chakra-ui/react';
import { FaRegEye, FaEyeDropper } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DetailAndEditSaleInvoice from '../components/saleInvoice/DetailAndEditSaleInvoice';
import saleInvoice from '../apis/saleInvoice';
import { format } from 'date-fns';
import { MdDeleteOutline } from 'react-icons/md';
import Header from '../components/Header';

const ManageSaleInvoice = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState()
    const toast = useToast();

    useEffect(() => {
        handleGetSaleInvoiceList();
    }, []);

    const handleGetSaleInvoiceList = async () => {
        await saleInvoice
            .getAll()
            .then(({ data, error }) => {
                setIsLoading(true);
                if (data) {
                    setData(data.products);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                toast({
                    title: 'Lỗi',
                    description: 'Có lỗi xảy ra!',
                    status: 'error',
                    duration: 300,
                    isClosable: true,
                });
            });
    };

    const handleDelete = async (id: any) => {
        try {
            if (id) {
                await saleInvoice
                    .deleteSaleInvoice(id)
                    .then(({ data, error }: any) => {
                        setIsLoading(true);
                        if (data) {
                            toast({
                                title: 'Thành công',
                                description: "Xóa thành công",
                                status: 'success',
                                duration: 300,
                                isClosable: true,
                            });
                            handleGetSaleInvoiceList();
                        }
                        if (error) {
                            toast({
                                title: 'Lỗi',
                                description: error,
                                status: 'error',
                                duration: 6000,
                                isClosable: true,
                            });
                        }
                    })
                    .catch(() => {
                        toast({
                            title: 'Lỗi',
                            description: 'Có lỗi xảy ra!',
                            status: 'error',
                            duration: 300,
                            isClosable: true,
                        });
                    });
                // setIsOpen(true)
                // setIsEdit(true)
            }
        } catch (err) {
            toast({
                title: 'Lỗi',
                description: 'Có lỗi xảy ra!',
                status: 'error',
                duration: 300,
                isClosable: true,
            });
        }
    };

    const handleGetSaleOrderInfo = async (id: any) => {
        try {
            if (id) {
                await saleInvoice
                    .getSaleOrderInfo(id)
                    .then(({ data, error }: any) => {
                        if (data) {
                            setOrderData(data)
                            setIsOpen(true)
                        }
                        if (error) {
                            toast({
                                title: 'Lỗi',
                                description: error,
                                status: 'error',
                                duration: 6000,
                                isClosable: true,
                            });
                        }
                    })
                    .catch(() => {
                        toast({
                            title: 'Lỗi',
                            description: 'Có lỗi xảy ra!',
                            status: 'error',
                            duration: 300,
                            isClosable: true,
                        });
                    });
            }
        } catch (err) {
            toast({
                title: 'Lỗi',
                description: 'Có lỗi xảy ra!',
                status: 'error',
                duration: 300,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Header />
            <Container maxW={'100%'}>
                <Heading as='h2' size='xl' textAlign={'center'} px={'8px'}>
                    Quản lý bán hàng
                </Heading>
                <TableContainer>
                    <Table size={'sm'}>
                        <Tr>
                            <Th>STT</Th>
                            <Th>Mã khách hàng</Th>
                            <Th>Tên khách hàng</Th>
                            <Th>Tên đơn hàng</Th>
                            <Th>Ngày chứng từ</Th>
                            <Th>Tổng tiền</Th>
                            <Th textAlign={'center'}>Hành động</Th>
                        </Tr>
                        {data.length > 0 && !isLoading && (
                            <Tbody>
                                {data?.map((item: any, index: number) => {
                                    return (
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{item._id}</Td>
                                            <Td>{item.nameCustomer}</Td>
                                            <Td>{item.orderName}</Td>
                                            <Td>{format(new Date(item.orderDate), 'dd/MM/yyyy')}</Td>
                                            <Td>{item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND')} </Td>
                                            <Td textAlign={'center'}>
                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Detail'
                                                    size={'xs'}
                                                    marginRight={'8px'}
                                                    icon={<FaRegEye />}
                                                    onClick={() => handleGetSaleOrderInfo(item._id)}
                                                />

                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Edit'
                                                    size={'xs'}
                                                    icon={<FaEyeDropper />}
                                                    marginRight={'8px'}
                                                    onClick={() => {
                                                        handleGetSaleOrderInfo(item._id)
                                                        setIsEdit(true)
                                                    }}
                                                />
                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Edit'
                                                    size={'xs'}
                                                    icon={<MdDeleteOutline />}
                                                    onClick={() => handleDelete(item._id)}
                                                />
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        )}
                    </Table>
                </TableContainer>
            </Container>
            {isLoading && (
                <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    <Spinner />
                </div>
            )}
            <DetailAndEditSaleInvoice
                orderData={orderData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                handleGetSaleInvoiceList={handleGetSaleInvoiceList}
            />
        </>
    );
};

export default ManageSaleInvoice;
