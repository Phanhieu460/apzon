import {
    Box,
    Button,
    Divider,
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
    Spacer,
    Stack,
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
import { useState } from 'react';
import purchaseInvoice from '../../apis/purchaseInvoice';

const DetailAndEditPurchaseInvoice = ({
    isOpen,
    setIsOpen,
    setIsEdit,
    isEdit,
    purchaseData,
    handleGetPurchaseInvoiceList,
}: {
    isOpen: boolean;
    setIsOpen: any;
    setIsEdit: any;
    isEdit: boolean;
    purchaseData: any;
    handleGetPurchaseInvoiceList: any;
}) => {
    const toast = useToast();
    const [products, setProducts] = useState<any>();

    let total = 0;
    const calculateTotalBill = () => {
        purchaseData?.products?.forEach((item: any) => {
            total += item.total;
        });
        return total
            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            .replace('₫', ' VND');
    };

    const handleQuantityChange = (index: number, value: number) => {
        const newItems = [...purchaseData.products];
        newItems[index].quantity = isNaN(value) ? 0 : value;
        newItems[index].total = isNaN(value)
            ? 0
            : value * newItems[index].productPrice;
        setProducts(newItems);
    };

    const handlePriceChange = (index: number, value: number) => {
        const newItems = [...purchaseData.products];
        newItems[index].productPrice = isNaN(value) ? 0 : value;
        newItems[index].total = isNaN(value) ? 0 : value * newItems[index].quantity;
        setProducts(newItems);
    };
    const handleAddRow = () => {
        const newItems = [...purchaseData.products];
        newItems.push({
            productId: '',
            productName: '',
            quantity: 0,
            productPrice: 0,
            total: 0,
        });
        setProducts(newItems);
    };

    const updatePurchaseInvoice = async () => {
        try {
            if (products) {
                await purchaseInvoice
                    .updatePurchaseInvoice({
                        ...purchaseData,
                        totalPrice: total,
                        products: products,
                    })
                    .then(({ data, error }) => {
                        if (data) {
                            toast({
                                title: 'Thành công',
                                description: 'Cập nhật thành công!',
                                status: 'success',
                                duration: 300,
                                isClosable: true,
                            });
                            handleGetPurchaseInvoiceList();
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
                    });
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
    };
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
                    <ModalHeader>Đơn mua hàng</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {purchaseData && (
                            <Box paddingBottom={4}>
                                <Flex p='4' gap={4}>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Mã nhà cung cấp:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Mã nhà cung cấp'
                                            value={purchaseData?._id}
                                        />
                                    </Box>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Ngày chứng từ:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Ngày chứng từ'
                                            value={purchaseData?.purchaseDate}
                                        />
                                    </Box>
                                </Flex>
                                <Flex px={4} gap={4}>
                                    <Box w='50%' display={'flex'} alignItems={'center'}>
                                        <Text fontSize='sm'>Tên nhà cung cấp:</Text>
                                        <Input
                                            isDisabled
                                            placeholder='Tên nhà cung cấp'
                                            value={purchaseData?.nameSupplier}
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
                                    {purchaseData?.products?.map((item: any, index: number) => {
                                        return (
                                            <Tr key={item.productId}>
                                                <Td>{index + 1}</Td>
                                                <Td textAlign={'center'}>{item.productId}</Td>
                                                <Td>{item.productName}</Td>
                                                <Td textAlign={'center'}>
                                                    {isEdit ? (
                                                        <Input
                                                            w={'50%'}
                                                            size={'sm'}
                                                            type='number'
                                                            min={0}
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
                                                                size={'sm'}
                                                                type='number'
                                                                min={0}
                                                                value={item.productPrice}
                                                                onChange={(e) =>
                                                                    handlePriceChange(
                                                                        index,
                                                                        parseFloat(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                            <InputRightAddon h={'32px'}>VND</InputRightAddon>
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
                                    {/* {isEdit && <Button onClick={handleAddRow}>Add</Button>} */}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    {isEdit && (
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={updatePurchaseInvoice}>
                                Lưu
                            </Button>
                            <Button
                                variant='ghost'
                                onClick={() => {
                                    setIsEdit(!isEdit);
                                    setIsOpen(false);
                                }}
                            >
                                Hủy
                            </Button>
                        </ModalFooter>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default DetailAndEditPurchaseInvoice;
