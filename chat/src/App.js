import {Box,Container,VStack,Button, Input,HStack} from "@chakra-ui/react"
import Message from "./Components/Message";
import {onAuthStateChanged, GoogleAuthProvider,getAuth,signInWithPopup,signOut} from "firebase/auth"
import {app} from "./firebase"
import { useEffect, useRef, useState } from "react";
import {getFirestore,addDoc, collection, serverTimestamp, onSnapshot,query,orderBy} from "firebase/firestore"




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
  const [message,setMessage] = useState("");
  const [messages , setMessages]  = useState([]);

  const divForScroll = useRef(null);

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      setMessage("")
      await addDoc(collection(db,"Message"),{
        text : message,
        uid : user.uid,
        url : user.photoURL,
        createdAt : serverTimestamp()
      });
      setMessage("")
      divForScroll.current.scrollIntoView({behaviour :"smooth"})
    } catch (error) {
      alert(error)
    }
  }


  useEffect(()=>{
    const q = query(collection(db,"Message"),orderBy("createdAt","asc"))
    const unsubscribe =  onAuthStateChanged(auth,(data)=>{
      setUser(data);
    });
    const unsubscribeForMessage = onSnapshot(q,(snap)=>{
      setMessages(
        snap.docs.map((item)=> {
          const id = item.id;
          return { id, ...item.data()};
        })
      );
    })
    return () =>{
      unsubscribe();
      unsubscribeForMessage();
    }
  },[])
  return (
    <Box bg ={"red.50"}>
      {
        user ? (
          <Container h ={"100vh"} bg = {"white"}>
            <VStack h= {"full"} w ={"full"} bg = {"telegram.100"} >
              <Button w = {"full"} colorScheme = {"blue"} onClick={logoutHandler}>
                Logout
              </Button>
              <VStack h= {"full"} w = {"full"} bg = "purple.200" padding={"4"} overflowY={"auto"} css = {{"&::-webkit-scrollbar" :{
                display :"none"
              }}}>
                {
                  messages.map((item)=>{
                    return (
                      <Message key = {item.id} user = {item.uid === user.uid ? "me": "other"}  text = {item.text} uri ={item.url}/>
                    )
                  })
                }
                <div ref={divForScroll}></div>
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
