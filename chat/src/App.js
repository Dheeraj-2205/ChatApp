import {Box,ButtonGroup,Container,VStack,Button, Input} from "@chakra-ui/react"


function App() {
  console.log("object");
  return (
    <Box bg ={"red.50"}>
      <Container h ={"100vh"} bg = {"white"}>
          <VStack h= {"full"} bg = {"telegram.100"}>
            <Button w = {"full"} colorScheme = {"blue"}>
              Logout
            </Button>
            <VStack h= "full" w = "full" bg = "purple.100">

            </VStack>

            <form>
              <Input/>
              <Button colorScheme = {"purple.100"} type = "submit">

              </Button>
            </form>
          </VStack>
      </Container>
    </Box>
  );
}

export default App;
