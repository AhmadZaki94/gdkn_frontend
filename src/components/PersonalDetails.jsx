import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BiUser } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { EditCustomer } from './EditCustomer';

export const PersonalDetails = ({customerDetails, customerAddressDetails}) => {

    // console.log("From Personal Details Component",customerDetails._id);
    // console.log("From Personal Details Component", customerAddressDetails._id);    
    
    const deleteCustomer = (id) => {
        axios.delete(`https://gdknbackend.herokuapp.com/customers/${id}`)
        .then((res) => {
            deleteCustomerAddress(customerAddressDetails._id);
        })
        .catch((err) => console.log(err));
    };
    
    const deleteCustomerAddress = (id) => {
        axios.delete(`https://gdknbackend.herokuapp.com/addressess/${id}`)
        .then((res) => {
            alert("Data Deleted Successfully");
        })
        .catch((err) => console.log(err));
    }
    
    const handleBothDeleteFunction = () => {
        deleteCustomer(customerDetails._id);
    }
    
    
  return (
    <Box height='250px'>
        <Box display='flex' marginTop='15px' gap='15px'>
            <Box marginLeft='35px'>
                <Image boxSize='100px' objectFit='cover' src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" alt='avatar'/>
            </Box>        
            <Box textAlign='left' width='70%' key={customerDetails?._id}>
                <Heading>{customerDetails?.firstName} {customerDetails?.lastName}</Heading>
                <Box width='500px' textAlign='left' display='flex' gap='25px' mt='10px'>
                    <Button colorScheme='white' color='black' leftIcon={<BiUser fontSize='35px' />} >{customerDetails?.userName}</Button>
                    <Button colorScheme='white' color='black' leftIcon={<AiOutlineMail fontSize='35px' />} >{customerDetails?.email}</Button>
                    <Button colorScheme='white' color='black' leftIcon={<BsTelephone fontSize='30px' />} >{customerDetails?.phone}</Button>
                </Box>
            </Box>
        </Box>
        <Box width='580px' height='50px' mt='15px'>
            <EditCustomer customerData={customerDetails} customerAddress={customerAddressDetails}/>
            <Button onClick={() => handleBothDeleteFunction()} leftIcon={<DeleteIcon />} borderRadius='none' ml='15px' colorScheme='red' variant='solid'>
                Delete Customer
            </Button>
        </Box>
        <Box border='1px solid transparent' bg='black' width='95%' m='auto' mt='25px'></Box>
        <Box border='1px solid transparent' width='80%' marginLeft='35px' marginTop='25px'>
            <Heading textAlign='left'>Personal Details</Heading>
            <Box display='flex' border='1px solid transparent' mt='25px' gap='25px' color='#F6F6C9'>
                <Box border='1px solid transparent' width='250px' height='75px' bg='#153462'>
                    <Text mt='12px'>First Name</Text>
                    <Heading as='h5' size='md'>{customerDetails.firstName}</Heading>
                </Box>
                <Box border='1px solid transparent' width='250px' height='75px' bg='#153462'>
                    <Text mt='12px'>Last Name</Text>
                    <Heading as='h5' size='md'>{customerDetails.lastName}</Heading>
                </Box>
                <Box border='1px solid transparent' width='250px' height='75px' bg='#153462'>
                    <Text mt='12px'>Gender</Text>
                    <Heading as='h5' size='md'>{customerDetails.gender}</Heading>
                </Box>
                <Box border='1px solid transparent' width='250px' height='75px' bg='#153462'>
                    <Text mt='12px'>Date Of Birth</Text>
                    <Heading as='h5' size='md'>{customerDetails.dob}</Heading>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}