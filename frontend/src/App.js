import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
import 'antd/dist/antd.css';
import './styles/globals.css'
import LayoutApp from './components/Layout';
import Login from './containers/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Login />
    </ChakraProvider>
  );
}

export default App;
