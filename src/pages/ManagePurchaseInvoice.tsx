import {
    Container,
    Heading,
    IconButton,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaEyeDropper, FaRegEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import purchaseInvoice from '../apis/purchaseInvoice';
import Header from '../components/Header';
import DetailAndEditPurchaseInvoice from '../components/purchaseInvoice/DetailAndEditPurchaseInvoice';

const ManagePurchaseInvoice = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseData, setPurchaseData] = useState()
    const toast = useToast();

    useEffect(() => {
        handleGetPurchaseInvoiceList();
    }, []);

    const handleGetPurchaseInvoiceList = async () => {
        await purchaseInvoice
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
                await purchaseInvoice
                    .deletePurchaseInvoice(id)
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
                            handleGetPurchaseInvoiceList();
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
    };

    const handleGetPurchaseOrderInfo = async (id: any) => {
        try {
            if (id) {
                await purchaseInvoice
                    .getSaleOrderInfo(id)
                    .then(({ data, error }: any) => {
                        if (data) {
                            setPurchaseData(data)
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
                <Heading as='h2' size='xl' textAlign={'center'} paddingTop={'8px'}>
                    Quản lý mua hàng
                </Heading>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Th>STT</Th>
                            <Th>Mã nhà cung cấp</Th>
                            <Th>Tên nhà cung cấp</Th>
                            <Th>Tên đơn hàng</Th>
                            <Th>Ngày chứng từ</Th>
                            <Th>Tổng tiền</Th>
                            <Th textAlign={'center'}>Hành động</Th>
                        </Thead>
                        {data.length > 0 && !isLoading && (
                            <Tbody>
                                {data?.map((item: any, index: number) => {
                                    return (
                                        <Tr key={item._id}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item._id}</Td>
                                            <Td>{item.nameSupplier}</Td>
                                            <Td>{item.purchaseName}</Td>
                                            <Td>{format(new Date(item.purchaseDate), 'dd/MM/yyyy')}</Td>
                                            <Td>{item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND')} </Td>
                                            <Td textAlign={'center'}>
                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Detail'
                                                    size={'xs'}
                                                    marginRight={'8px'}
                                                    icon={<FaRegEye />}
                                                    onClick={() => handleGetPurchaseOrderInfo(item._id)}
                                                />

                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Edit'
                                                    size={'xs'}
                                                    icon={<FaEyeDropper />}
                                                    marginRight={'8px'}
                                                    onClick={() => {
                                                        handleGetPurchaseOrderInfo(item._id)
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
            <DetailAndEditPurchaseInvoice purchaseData={purchaseData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                handleGetPurchaseInvoiceList={handleGetPurchaseInvoiceList} />
        </>
    );
};

export default ManagePurchaseInvoice;
