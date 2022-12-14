import React, { Component, useEffect } from 'react';
import style from './index.module.css';
import axios from "axios";
import { toast } from 'react-toastify'
import { Form, Input, Button } from "antd";
import loginImg from './login.png'
import { useNavigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import { useCookies } from 'react-cookie';

const FormItem = Form.Item;

const Login = () =>{
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  console.log('cookie', cookies.TenNhanVien)

  const navigate = useNavigate() 
  useEffect(()=>{
    removeCookie('id', { path: '/' })
    removeCookie('TenNhanVien', { path: '/' })
    removeCookie('rToken', { path: '/' })
    removeCookie('MaCoSo', { path: '/' })
  }
  ,[])

  async function submitLogin(data){
      return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/user/login', {id: data.id, password: data.password})
      .then((res) => {
        console.log('res', res)
        setCookie('id', res.data.id, {expires})
        setCookie('TenNhanVien', res.data.userName, {expires})
        setCookie('MaCoSo', res.data.MaCoSo, {expires})
        setCookie('rToken', res.data.accessToken, {expires})
        navigate('/')
      })
      .catch(function (error) {
        // handle error
        toast.error(error?.response?.data?.message)
      })
  }
  
    return (
      <div>
      <div className={style.lContainer}>
      <div className={style.lItem}>
          <div className={style.loginImage}>
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
          </div>
          <div className={style.loginForm}>
            <Form
              name="basic"
              layout="vertical" 
              className={style.loginForm0}
              autoComplete="off"
              onFinish={submitLogin}
              >
              <FormItem
                 label="T??n ????ng nh???p:"
                 name="id"
                 rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p t??i kho???n!',
                  },
                ]}
                 >
                <Input                    
                    placeholder="T??n ????ng nh???p"
                  />
              </FormItem>
              <FormItem
                label="M???t kh???u:"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p t??i kho???n!',
                  },
                ]}
                >
                <Input.Password                    
                    type="password"
                    placeholder="M???t kh???u"
                  />
              </FormItem>
              <FormItem>
                
                <Button
                  type="primary"
                  htmlType="submit"
                  className={style.loginFormButton}
                >
                  ????ng nh???p
                </Button>
              </FormItem>
            </Form>
          </div>
      </div>
      <div className={style.footer}>
        <a
            href="https://thuvien.ufm.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coppyright by:{' '} ?? 2022 Trung t??m h???c li???u - Tr?????ng ?????i h???c T??i ch??nh-Marketing
          </a>
      </div>
      </div>
      </div>
    );
  }

export default Login;