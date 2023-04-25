import {Box,Container,VStack,Button, Input,HStack} from "@chakra-ui/react"
import Message from "./Components/Message";
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth"
import {app} from "./firebase"
import { useState } from "react";
const auth = getAuth(app);
const loginHandler = () =>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}
function App() {
  const  [user,setUser] = useState(false)
  return (
    <Box bg ={"red.50"}>
      {
        user ? (
          <Container h ={"100vh"} bg = {"white"}>
            <VStack h= {"full"} bg = {"telegram.100"} overflowX={"auto"}>
              <Button w = {"full"} colorScheme = {"blue"}>
                Logout
              </Button>
              <VStack h= "full" w = "full" bg = "purple.100" padding={"4"}>
                <Message text = {"sample message"} uri = {"dfkl"}/>
              </VStack>

              <form style={{width:"100%"}}>
                <HStack>
                  <Input placeholder="Enter a message"/>
                  <Button colorScheme = {"purple"} type = "submit">
                      send
                  </Button>
                </HStack>
              </form>
            </VStack>
         </Container>
        ) :
        <VStack h = "100vh" justifyContent={"center"}>
          <button colorScheme={"purple"} onClick={loginHandler}>
            Sign In With Google
          </button>
        </VStack>
      }
      
    </Box>
  );
}

export default App;
