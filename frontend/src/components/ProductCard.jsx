import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Image, Heading, Text, HStack, IconButton, useColorModeValue, useToast, useDisclosure, ModalContent, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalHeader, Input, VStack, Button, ModalFooter} from "@chakra-ui/react"
import { useProductStore } from "../store/product";

import { useState } from "react";


const ProductCard = ({product}) => {
    const [updatedProduct, setUpdateProduct] = useState(product);
    const textColor = useColorModeValue("gray.600" , "gray.200");
    const bg= useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();  
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);    
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
                duration: 3000,
            });
        } else { 
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                duration: 3000,
            });
        }
    }

   
    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};
    return (
        <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>

            <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                $ {product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
               <VStack spacing={4}>
                <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdateProduct({...updatedProduct, name: e.target.value})}>
                </Input>
                <Input
                placeholder='Product Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdateProduct({...updatedProduct, price: e.target.value})}>
                </Input>
                <Input
                placeholder='Product Image'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdateProduct({...updatedProduct, image: e.target.value})}>
                </Input>

               </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} 
                onClick={() => { handleUpdateProduct(product._id, updatedProduct); }}>
                    Update
                </Button>
                <Button variant='ghost' mr={3} onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
            </ModalContent>

            </Modal>

        </Box>
    )
};

export default ProductCard;
