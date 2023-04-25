import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'
const Message = ({text,uri}) => {
  return (
    <HStack>
        <Text>{Text}</Text>
        <Avatar src= {uri}/>
    </HStack>
  )
}

export default Message