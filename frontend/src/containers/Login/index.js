import React, { Component } from 'react';
import style from './index.module.css';
// import axios from "axios";
import { Form, Input, Button } from "antd";
import loginImg from './login.png'
const FormItem = Form.Item;

const Login = () =>{
   
    return (
      <div>
      <div className={style.lContainer}>
      <div className={style.lItem}>
          <div className={style.loginImage}>
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
          </div>
          <div className={style.loginForm}>
            <Form layout="vertical" className={style.loginForm0}>
              <FormItem
                 label="Tên đăng nhập:"
                 >
                <Input
                    
                    placeholder="Tên đăng nhập"
                  />
              </FormItem>
              <FormItem
                label="Mật khẩu:"
                >
                <Input.Password
                    
                    type="password"
                    placeholder="Mật khẩu"
                  />
              </FormItem>
              <FormItem>
                
                <Button
                  type="primary"
                  htmlType="submit"
                  className={style.loginFormButton}
                >
                  Đăng nhập
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
            Coppyright by:{' '} © 2022 Trung tâm học liệu - Trường Đại học Tài chính-Marketing
          </a>
      </div>
      </div>
      </div>
    );
  }

export default Login;