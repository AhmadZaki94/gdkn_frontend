import { EditIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import axios from "axios";
import React, { useState } from "react";


export const EditCustomer = ({customerData, customerAddress}) => {
    // console.log("Customer Data in Edit Customer Component", customerData);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {firstName,lastName,email,phone,dob,gender,userName} = customerData;

    const {customerId, address, landmark, city, state, country,zipcode } = customerAddress;

    const [formData, setFormData] = useState({
        firstName,
        lastName,
        userName,
        email,
        phone,
        dob,
        gender
    });

    const [addressData, setAddressData] = useState({
      customerId,
      address,
      landmark,
      city,
      state,
      country,
      zipcode
  });

    const [data, setData] = useState([]);

    const [data1, setData1] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);

    
  const handleAddressChange = () => { 
    setTabIndex(1);
  }

  const handleCustomerChange = () => {
    setTabIndex(0);
  }


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name] : value,
      });
      console.log(e.target);
    };

    const handleSubmit = (e) => {
      setData([...data, formData]);
      axios.put(`https://gdknbackend.herokuapp.com/customers/${e}`, {...formData})
      .then((r) => {
        alert('Data Updated Successfully');
        console.log("from Response of Form Data",r.data);
      })
      .catch((err) => console.log(err));
      console.log(e,"Id from response");
    }

    const handleChange1 = (e) => {
      const { name, value } = e.target;
      setAddressData({
        ...addressData,
        [name] : value,
      });
      console.log(e.target);
    };

    const handleSubmit1 = (e) => {
      setData1([...data1, addressData]);

      axios.put(`https://gdknbackend.herokuapp.com/addressess/${e}`, {...addressData})
      .then((r) => {
        alert('Data Updated Successfully');
        console.log(r.data);
      })
      .catch((err) => console.log(err));
      console.log(e);
    };

    return (
      <>
        <Button leftIcon={<EditIcon />} colorScheme='blue' borderRadius='none' variant='solid' onClick={onOpen}>Edit</Button>
         <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Customer Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Tabs index={tabIndex}>
                <TabList>
                  <Tab>Customer Details</Tab>
                  <Tab>Address Details</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input defaultValue={customerData.firstName} value={formData.firstName} onChange={handleChange} name='firstName' placeholder='First name' />
                    </FormControl>
    
                    <FormControl mt={4}>
                      <FormLabel>Last name</FormLabel>
                      <Input defaultValue={customerData.lastName} value={formData.lastName} onChange={handleChange} name='lastName' placeholder='Last name' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>UserName</FormLabel>
                      <Input defaultValue={customerData.userName} value={formData.userName} onChange={handleChange} name='userName' placeholder='User Name' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Email</FormLabel>
                      <Input defaultValue={customerData.email} value={formData.email} onChange={handleChange} name='email' placeholder='Enter Email' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input defaultValue={customerData.phone} value={formData.phone} onChange={handleChange} name='phone' placeholder='Phone Number' type='number' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Date Of Birth</FormLabel>
                      <Input defaultValue={customerData.dob} value={formData.dob} onChange={handleChange} name='dob' placeholder='Date Of Birth' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Gender</FormLabel>
                      <Input defaultValue={customerData.gender} value={formData.gender} onChange={handleChange} name='gender' placeholder='Gender' />
                    </FormControl>
                    <Button onClick={() => handleSubmit(customerData._id)} colorScheme='blue' mt='15px' mr={3}>
                      Update Customer
                    </Button>
                    <Button onClick={handleAddressChange} mt='15px' colorScheme='green'>Go To Next Tab</Button>
                  </TabPanel> 
                  <TabPanel>
                      <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input defaultValue={customerAddress.address} value={formData.address} onChange={handleChange1} name='address' placeholder='Address' />
                      </FormControl>
  
                      <FormControl mt={4}>
                        <FormLabel>Land Mark</FormLabel>
                        <Input defaultValue={customerAddress.landmark} value={formData.landmark} onChange={handleChange1} name='landmark' placeholder='Landmark' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>City</FormLabel>
                        <Input defaultValue={customerAddress.city} value={formData.city} onChange={handleChange1} name='city' placeholder='City' />
                      </FormControl>
                      
                      <FormControl mt={4}>
                        <FormLabel>State</FormLabel>
                        <Input defaultValue={customerAddress.state} value={formData.state} onChange={handleChange1} name='state' placeholder='State' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Country</FormLabel>
                        <Input defaultValue={customerAddress.country} value={formData.country} onChange={handleChange1} name='country' placeholder='Country' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Zipcode</FormLabel>
                        <Input defaultValue={customerAddress.zipcode} value={formData.zipcode} onChange={handleChange1} name='zipcode' placeholder='Zipcode' />
                      </FormControl>
                      <Button onClick={() => handleSubmit1(customerAddress._id)} colorScheme='blue' mt='15px' mr={3}>
                        Update Address
                      </Button>
                      <Button onClick={handleCustomerChange} mt='15px' colorScheme='green'>Go To Previous Tab</Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr='10px'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }