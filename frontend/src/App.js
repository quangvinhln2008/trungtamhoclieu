import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
import 'antd/dist/antd.css';
import './styles/globals.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import RoutesApp from './routes';
import LayoutApp from './components/Layout';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import NhomDoiTuong from './containers/List/NhomDoiTuong';

const App = (props) => {
  
  console.log('RoutesApp',RoutesApp['admin'])
  return (
    <ChakraProvider theme={theme}>
      <Router>        
        <Routes>
          <Route path='/' element ={<LayoutApp component ={<Dashboard />} />}/>
          <Route path='nhomdoituong' element ={<LayoutApp component ={<NhomDoiTuong />} />}/>
          
        {/* {RoutesApp['admin'].map((item) =>(
          <Route 
            key ={item.key}
            path = {item.key}
            element = {<LayoutApp component = {item.component} />}
            // render = {(props)=(
              
            //   <LayoutApp 
            //     component ={item.component}
            //     {...props}
            //   />
              
            // )}
          />
        ))
        } */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
  
}

export default App;
