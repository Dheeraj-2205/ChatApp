import {Box,Container,VStack,Button, Input,HStack} from "@chakra-ui/react"
import Message from "./Components/Message";
import {onAuthStateChanged, GoogleAuthProvider,getAuth,signInWithPopup,signOut} from "firebase/auth"
import {app} from "./firebase"
import { useEffect, useState } from "react";
import {getFirestore,addDoc, collection, serverTimestamp} from "firebase/firestore"




const auth = getAuth(app);
const db = getFirestore(app);
const loginHandler = () =>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}


const logoutHandler = () =>{
  signOut(auth)
}
function App() {
  const  [user,setUser] = useState(false);
  const [message,setMessage] = useState("")

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      await addDoc(collection(db,"Message"),{
        text : message,
        uid : user.uid,
        url : user.photoURL,
        createdAt : serverTimestamp()
      });
      setMessage("")
    } catch (error) {
      alert(error)
    }
  }


  useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth,(data)=>{
      setUser(data);
    });
    return () =>{
      unsubscribe();
    }
  })
  return (
    <Box bg ={"red.50"}>
      {
        user ? (
          <Container h ={"100vh"} bg = {"white"}>
            <VStack h= {"full"} bg = {"telegram.100"} overflowX={"auto"}>
              <Button w = {"full"} colorScheme = {"blue"} onClick={logoutHandler}>
                Logout
              </Button>
              <VStack h= "full" w = "full" bg = "purple.100" padding={"4"}>
                <Message text = {"sample message"} uri = {"dfkl"}/>
              </VStack>

              <form onSubmit ={submitHandler} style={{width:"100%"}}>
                <HStack>
                  <Input placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                  <Button colorScheme = {"purple"} type = "submit">
                      send
                  </Button>
                </HStack>
              </form>
            </VStack>
         </Container>
        ) :
        <VStack h = "100vh" justifyContent={"center"} bg={"white"}>
          <Button colorScheme={"purple"} onClick={loginHandler}>
            Sign In With Google
          </Button>
        </VStack>
      }
      
    </Box>
  );
}

export default App;
