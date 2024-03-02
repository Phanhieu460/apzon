import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useState } from 'react';
import saleInvoice from '../../apis/saleInvoice';

const DetailAndEditSaleInvoice = ({
    isOpen,
    setIsOpen,
    setIsEdit,
    isEdit,
    orderData,
    handleGetSaleInvoiceList
}: {
    isOpen: any;
    setIsOpen: any;
    setIsEdit: any;
    isEdit: boolean;
    orderData: any;
    handleGetSaleInvoiceList: any
}) => {
    console.log(orderData);
    const toast = useToast()
    const [products, setProducts] = useState<any>();

    let total = 0;
    const calculateTotalBill = () => {
        orderData?.products?.forEach((item: any) => {
            total += item.total;
        });
        return total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ' VND');
    };

    const handleQuantityChange = (index: number, value: number) => {
        const newItems = [...orderData.products];
        newItems[index].quantity = isNaN(value) ? 0 : value;
        newItems[index].total = isNaN(value) ? 0 : value * newItems[index].productPrice;
        setProducts(newItems);
    };

    const handlePriceChange = (index: number, value: number) => {
        const newItems = [...orderData.products];
        newItems[index].productPrice = isNaN(value) ? 0 : value;
        newItems[index].total = isNaN(value) ? 0 : value * newItems[index].quantity;
        setProducts(newItems);
    };

    const updateSaleInvoice = async () => {
        try {
            if (products) {
                await saleInvoice.updateSaleInvoice({ ...orderData, totalPrice: total, products: products }).then(({ data, error }) => {
                    if (data) {
                        toast({
                            title: 'Thành công',
                            description: 'Cập nhật thành công!',
                            status: 'success',
                            duration: 300,
                            isClosable: true,
                        });
                        handleGetSaleInvoiceList()
                    }
                    if (error) {
                        toast({
                            title: 'Lỗi',
                            description: 'Có lỗi xảy ra!',
                            status: 'error',
                            duration: 300,
                            isClosable: true,
                        });
                    }
                })
            }
        } catch (error) {
            toast({
                title: 'Lỗi',
                description: 'Có lỗi xảy ra!',
                status: 'error',
                duration: 300,
                isClosable: true,
            });
        }
        setIsOpen(!isOpen);
        setIsEdit(false);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(!isOpen);
                    setIsEdit(false);
                }}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đơn bán hàng</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {orderData && (
                            <Box paddingBottom={4}>
                                <Flex p='4' gap={4}>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Mã khách hàng:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Mã khách hàng'
                                            value={orderData._id}
                                        />
                                    </Box>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Ngày chứng từ:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Ngày chứng từ'
                                            value={format(
                                                new Date(orderData.orderDate),
                                                'dd/MM/yyyy'
                                            )}
                                        />
                                    </Box>
                                </Flex>
                                <Flex px={4} gap={4}>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Tên khách hàng:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Tên khách hàng'
                                            value={orderData.nameCustomer}
                                        />
                                    </Box>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm' w={'95px'}>
                                            Tổng tiền:
                                        </Text>
                                        <Input
                                            isDisabled
                                            placeholder='Tổng tiền'
                                            value={calculateTotalBill()}
                                        />
                                    </Box>
                                </Flex>
                            </Box>
                        )}

                        <TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>STT</Th>
                                        <Th textAlign={'center'}>Mã mặt hàng</Th>
                                        <Th textAlign={'center'}>Tên mặt hàng</Th>
                                        <Th textAlign={'center'}>Số lượng</Th>
                                        <Th textAlign={'center'}>Đơn giá</Th>
                                        <Th textAlign={'center'}>Thành tiền</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {orderData?.products?.map((item: any, index: number) => {
                                        return (
                                            <Tr key={item.productId}>
                                                <Td>{index + 1}</Td>
                                                <Td textAlign={'center'}>{item.productId}</Td>
                                                <Td>{item.productName}</Td>
                                                <Td textAlign={'center'}>
                                                    {isEdit ? (
                                                        <Input
                                                            w={'50%'}
                                                            type='number'
                                                            size={'sm'}
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    index,
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        item.quantity
                                                    )}
                                                </Td>
                                                <Td textAlign={'center'}>
                                                    {isEdit ? (
                                                        <InputGroup w={'50%'} margin={'0 auto'}>
                                                            <Input
                                                                type='number'
                                                                value={item.productPrice}
                                                                onChange={(e) =>
                                                                    handlePriceChange(
                                                                        index,
                                                                        parseFloat(e.target.value)
                                                                    )
                                                                }
                                                                size={'sm'}
                                                            />
                                                            <InputRightAddon h={'32px'}>
                                                                VND
                                                            </InputRightAddon>
                                                        </InputGroup>
                                                    ) : (
                                                        item.productPrice
                                                            .toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })
                                                            .replace('₫', ' VND')
                                                    )}
                                                </Td>
                                                <Td textAlign={'center'}>
                                                    {item.total
                                                        .toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })
                                                        .replace('₫', ' VND')}
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    {isEdit && <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={updateSaleInvoice}
                        >
                            Lưu
                        </Button>
                        <Button variant='ghost' onClick={() => {
                            setIsOpen(!isOpen)
                            setIsEdit(false)
                        }}>Hủy</Button>
                    </ModalFooter>}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default DetailAndEditSaleInvoice;
