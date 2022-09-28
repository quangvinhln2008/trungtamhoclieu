import React,  { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import { Layout, Breadcrumb, Menu  } from 'antd';
import styles from './index.module.css'
const { Header } = Layout;

const HeaderApp = (props) => {
  const {collapsed, onClickHandle} = props
  const [userName, setUserName] = useState('')
  useEffect(()=>{
    setUserName(window.localStorage.getItem('fullNameTracuu'))
  }, [])
  

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  function logout(){
    const isRememberMe = window.localStorage.getItem('rememberTracuu')
    if (isRememberMe === 'true') {
      window.localStorage.removeItem('passwordTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('fullNameTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('rTokenTracuu')
    } else {
      window.localStorage.clear()
    }
    // router.push('/login')
  }
  const items = [
    getItem(`Xin chào, ${userName}`, 'sub1',null, [
      getItem(<Link href={'/profile'}><a >Trang cá nhân</a></Link>, '1', <UserOutlined />),
      getItem(<a onClick={logout}>Đăng xuất</a>, '2', <LogoutOutlined />),
    ])
  ];
  
  return (
    <>      
      <Header
          className="site-layout-background"
          style={{
            padding:0,
            background: '#fff',
            display: "flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent: "space-between"
          }}
        >
          <div className={styles.headerBreacrumb}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              style:{padding: '0 24px',
                fontSize: '18px',
                lineHeight: '64px',
                cursor: 'pointer'} ,
              onClick: ()=> onClickHandle(),
            })}
            {/* {
            <Breadcrumb className = {styles.headerBreadcrumbItem}>
              <Breadcrumb.Item fontSize="18px">
                <Link  href={'/'}>Home</Link>
              </Breadcrumb.Item>
              {pathname==='/thunhapthang' && <Breadcrumb.Item fontSize="18px">
                Thu nhập tháng
                  </Breadcrumb.Item>
              }
              {pathname==='/thuetncn' && <Breadcrumb.Item fontSize="18px">
                Thuế TNCN
                  </Breadcrumb.Item>
                }
              {pathname==='/changepassword' && <Breadcrumb.Item fontSize="18px">
                Đổi mật khẩu
                </Breadcrumb.Item>
              }
              {pathname==='/profile' && <Breadcrumb.Item fontSize="18px">
                Trang cá nhân
                </Breadcrumb.Item>
              }
              {pathname==='/employees' && <Breadcrumb.Item fontSize="18px">
                Nhân viên
                </Breadcrumb.Item>
              }
              {pathname==='/employees/create' && <><Breadcrumb.Item fontSize="18px">
                  <Link  href={'/employees'}>Nhân viên</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item fontSize="18px">
                  Thêm mới nhân viên
                  </Breadcrumb.Item></>
              }
              {pathname==='/employees/[id]' && <><Breadcrumb.Item fontSize="18px">
              <Link  href={'/employees'}>Nhân viên</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item fontSize="18px">
              Cập nhật nhân viên
              </Breadcrumb.Item></>
              } 
              {pathname==='/users' && <Breadcrumb.Item fontSize="18px">
                User
                </Breadcrumb.Item>
              }
            </Breadcrumb>} */}
          </div>
          <div>
          <Menu
            items={items}
          />
          </div>
        </Header>
    </>
  );
}

export default HeaderApp;