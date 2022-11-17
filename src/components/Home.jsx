import { Search2Icon } from "@chakra-ui/icons"
import { Box, Button, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddressDetails } from "./AddressDetails";
import { PersonalDetails } from "./PersonalDetails";

export const Home = () => {

  const [customerData, setCustomerData] = useState([]);

  const [individualCustomerData, setIndividualCustomerData] = useState("");

  const [individualAddress, setIndividualAddress] = useState("");

  const [createCustomer, setCreateCustomer] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [createAddress, setCreateAddress] = useState({
    customerId: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const [query, setQuery] = useState();

  const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = () => {
      setTabIndex(1);
    }

    const handleTabChange1 = () => {
      setTabIndex(0);
    }

  const { isOpen, onOpen, onClose } = useDisclosure();

  
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [data1, setData1] = useState([]);

  
  useEffect(() => {
    getSearchData(query);
  },[query]);

  const getSearchData = (query) => {
    // axios.get(`http://localhost:5000/customers/search/${query}`)
    axios.get(`https://gdknbackend.herokuapp.com/customers/search/${query}`)
    .then((res) => {
      setCustomerData(res.data);
    })
    .catch((err) => console.error(err));
  };
  
  const handleChangeOfSearch = (e) => {
    if(e.target.value === "")
    {
      getCustomerData();
    }
    else{
      setQuery(e.target.value);
    }
  }

  //Posting Request
  const handleChangeOfCustomer = (e) => {
    const { name, value } = e.target;
    setCreateCustomer({
      ...createCustomer,
      [name] : value,
    });
    console.log(e.target);
  }

  const handleChangeOfAddress = (e) => {
    const { name, value } = e.target;
    setCreateAddress({
      ...createAddress,
      [name] : value,
    });
    console.log(e.target);
  }

  const handleSubmitOfCustomer = () => {
    // axios.post('http://localhost:5000/customers', {...createCustomer})
    axios.post('https://gdknbackend.herokuapp.com/customers', {...createCustomer})
    .then((r) => {
      let getCustomerIdToPostAddress = r.data._id;
      handleSubmitOfAddress(getCustomerIdToPostAddress);
    })
    .catch((err) => console.log(err));
  };

  //Post Request for Address 
  const handleSubmitOfAddress = (customers_id) => {
    axios.post('https://gdknbackend.herokuapp.com/addressess', {...createAddress, customerId: customers_id})
    .then((r) => {
      setData1(r.data);
      alert('Data Created Successfully');
      onClose();
      console.log(r.data);
    })
    .catch((err) => console.log(err));
  }

  const handleBothFunctionToPost = () => {
    handleSubmitOfCustomer();
  }


  //Use effect for Getting all customers data
  useEffect(() => {
      getCustomerData();
    },[data1]);
    
    const getCustomerData = () => {
      axios.get('https://gdknbackend.herokuapp.com/customers')
      .then((res) => {
        setCustomerData(res.data);
        // console.log("From getCustomerData Function", res.data);
      })
      .catch((err) => console.log(err));
    };

    const getIndividualCustomer = (e) => {
      // console.log("Individual Customer ID", e);
      axios.get(`https://gdknbackend.herokuapp.com/customers/${e}`)
      .then((res)=>{
        setIndividualCustomerData(res.data);
        getIndividualCustomerAddress(e);
      })
      .catch((err) => console.log(err));
    
    };

    const getIndividualCustomerAddress = (e) =>{
      // console.log("Individual Customer Address ID", e);
      axios.get(`https://gdknbackend.herokuapp.com/addressess/customers/${e}`)
      .then((res)=>{
        setIndividualAddress(res.data);
      })
      .catch((err) => console.log(err));
    };
    
    
    

  return (
      <Box>
        <Box bg='#153462' color='#F6F6C9' border='1px solid yellow' height='60px'>
          <Heading fontFamily='MongoDB Value Serif' textAlign='left' p='5px' marginLeft='45px'>Customer Details</Heading>
        </Box>
        <Box display='flex' border='1px solid transparent' gap='25px' mt='10px' height='800'>
          <Box border='1px solid transparent' width='30%'>
            {/* <h1>Box1</h1> */}
          <Box border='1px solid transparent' borderRadius='5px' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" height='75px' mb='15px' bg='white' p='15px' mt='5px'>
                <InputGroup>
                   <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children={<Search2Icon />}
                    />
                  <Input placeholder='Search Customers' onChange={handleChangeOfSearch} />
                  <Button onClick={onOpen} colorScheme='green' ml='5px'>+</Button>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent ModalContent>
            
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                  <Tabs index={tabIndex}>
                    <TabList>
                      <Tab>Add Customer</Tab>
                      <Tab>Add Address</Tab>
                    </TabList>
                    <TabPanels>
                    <TabPanel>
                      <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input value={createCustomer.firstName} onChange={handleChangeOfCustomer} name='firstName' placeholder='First name' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input value={createCustomer.lastName} onChange={handleChangeOfCustomer} name='lastName' placeholder='Last name' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>UserName</FormLabel>
                        <Input value={createCustomer.userName} onChange={handleChangeOfCustomer} name='userName' placeholder='User Name' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input value={createCustomer.email} onChange={handleChangeOfCustomer} name='email' placeholder='Enter Email' />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input value={createCustomer.phone} onChange={handleChangeOfCustomer} name='phone' placeholder='Phone Number' type='number' />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Date Of Birth</FormLabel>
                        <Input value={createCustomer.dob} onChange={handleChangeOfCustomer} name='dob' placeholder='Date Of Birth' />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Gender</FormLabel>
                        <Input value={createCustomer.gender} onChange={handleChangeOfCustomer} name='gender' placeholder='Gender' />
                      </FormControl>
                      <Button onClick={handleTabChange} mt='15px' colorScheme='green'>Go To Next Tab</Button>
                    </TabPanel>
                  {/* <Button>Go To Second Tab</Button> */}
                    <TabPanel>
                      <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input value={createAddress.address} onChange={handleChangeOfAddress} name='address' placeholder='Address' />
                      </FormControl>
    
                      <FormControl mt={4}>
                        <FormLabel>Land Mark</FormLabel>
                        <Input value={createAddress.landmark} onChange={handleChangeOfAddress} name='landmark' placeholder='Landmark' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>City</FormLabel>
                        <Input  value={createAddress.city} onChange={handleChangeOfAddress} name='city' placeholder='City' />
                      </FormControl>
                      
                      <FormControl mt={4}>
                        <FormLabel>State</FormLabel>
                        <Input value={createAddress.state} onChange={handleChangeOfAddress} name='state' placeholder='State' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Country</FormLabel>
                        <Input value={createAddress.country} onChange={handleChangeOfAddress} name='country' placeholder='Country' />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel>Zipcode</FormLabel>
                          <Input value={createAddress.zipcode} onChange={handleChangeOfAddress} name='zipcode' placeholder='Zipcode' />
                      </FormControl>
                      <Button onClick={handleTabChange1} mt='15px' colorScheme='green'>Go To Previous Tab</Button>
                      <Button onClick={handleBothFunctionToPost} colorScheme='blue' ml='15px' mt='15px'>
                        Create 
                      </Button>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
                </InputGroup>
            </Box>
            {customerData[0] && customerData.map((e, i) =>{
              return (
                <Box 
                    bg='white'
                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    _hover={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", cursor: "pointer" }} 
                    border='1px solid transparent' 
                    display='flex'
                    marginBottom='15px'
                    p='10px' 
                    key={i}
                    onClick={() => getIndividualCustomer(e._id)}
                    >
                    <Box>
                      <Image boxSize='100px' objectFit='cover' src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" alt="avatar" />
                    </Box>
                    <Box>
                      <Heading as='h2' size='xl' marginTop='15px' marginLeft='15px'>{e.firstName} {e.lastName}</Heading>
                      <Heading as='h4' size='md'>{e.email}</Heading>
                    </Box>
                </Box>
                )
              })
            }
          </Box>
          <Box border='1px solid transparent' width='70%'>
            {/* <h1>box2</h1> */}
           {customerData?.[0] && <Box border='1px solid transaparent' height='400px'>
              <PersonalDetails customerDetails={!individualCustomerData ? customerData[0] : individualCustomerData} customerAddressDetails={individualAddress} />
            </Box>}
            <Box>
              <AddressDetails customerAddressDetails={individualAddress} />
            </Box>
          </Box>
        </Box>
      </Box>
  )
}
