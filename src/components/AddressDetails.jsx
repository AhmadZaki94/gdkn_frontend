import { Box, Heading, Text } from '@chakra-ui/react'

export const AddressDetails = ({customerAddressDetails}) => {
  // console.log("from Address Component",customerAddressDetails);
  return (
    <Box border='1px solid transparent' height='350px' mt='25px'>
       <Box border='1px solid transparent' width='450px' ml='35px'>
        <Heading textAlign='left'>Address</Heading>
            <Box border='1px solid transparent' display='flex' justifyContent='space-between' mt='25px'>
                <Text p='5px' fontSize='20px' fontWeight='600'>Address</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.address}</Text>
            </Box>
            <Box border='1px solid transparent' bg='#153462' color='#F6F6C9' display='flex' justifyContent='space-between'>
                <Text p='5px' fontSize='20px' fontWeight='600'>Landmark</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.landmark}</Text>
            </Box>
            <Box border='1px solid transparent' display='flex' justifyContent='space-between'>
                <Text p='5px' fontSize='20px' fontWeight='600'>City</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.city}</Text>
            </Box>
            <Box border='1px solid transparent' bg='#153462' color='#F6F6C9' display='flex' justifyContent='space-between'>
                <Text p='5px' fontSize='20px' fontWeight='600'>State</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.state}</Text>
            </Box>
            <Box border='1px solid transparent' display='flex' justifyContent='space-between'>
                <Text p='5px' fontSize='20px' fontWeight='600'>Country</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.country}</Text>
            </Box>
            <Box border='1px solid transparent' bg='#153462' color='#F6F6C9' display='flex' justifyContent='space-between'>
                <Text p='5px' fontSize='20px' fontWeight='600'>Zipcode</Text>
                <Text p='5px' fontSize='20px' fontWeight='600'>{customerAddressDetails.zipcode}</Text>
            </Box>
       </Box>
    </Box>
  )
}
