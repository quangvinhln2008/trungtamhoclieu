import React, {Component, useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

import { Button, Result, Spin   } from 'antd';
import HeaderApp from '../Header'
import Navbar from "../Navbar";
import Footer from "../Footer";

import { Layout } from 'antd';

const { Header, Content } = Layout;

const LayoutApp = (props) => {
  const {children} = props
  const [collapsed, setCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    setTimeout(() => {
      setIsLogin(window.localStorage.getItem('rTokenTracuu') !== null ? true : false)
      setIsLoading(false)
      }, 500);
    }, []);

  
  function onClickLogin(){
    // router.push('/login')
  }

  function toogleMenu(){
    setCollapsed(!collapsed)
  }
  // if(isLogin){
  return ( 
    <Router>
      <Layout style={{height: "100%"}} >
      <Navbar collapsed ={collapsed} />
      <Layout className="site-layout" style={{width: "auto", minHeight:"667px"}} >
          <HeaderApp collapsed = {collapsed} onClickHandle = {toogleMenu} />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 20,
              minHeight: 280,
              background:'#fff'
            }}
          >
            {/* <Component /> */}
          </Content>
          
        <Footer />
      </Layout>
    </Layout> 
  </Router>
  //  )}
  //  return(
  //   <>
      
  //     {isLoading ? <Spin  size="large"/> :
      
  //     <Result
  //       status="403"
  //       title=""
  //       subTitle="Bạn chưa đăng nhập. Vui lòng đăng nhập"
  //       extra={<Button onClick={onClickLogin} type="primary">Đăng nhập</Button>}
  //     />  
  //     }
  //   </>
  );
}

export default LayoutApp;