import React, {useState, useEffect} from "react";
import {Text} from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  UserOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  PicRightOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  AccountBookOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import styles from './index.module.css'

const {Sider } = Layout;

const Navbar = (props) =>{
  const {collapsed} = props
  const [role, setRole] = useState('user')
  
  useEffect(()=>{
    setRole(window.localStorage.getItem('rolesTracuu'))
    }, []);

  function logout(){
    const isRememberMe = window.localStorage.getItem('rememberTracuu')
    if (isRememberMe === 'true') {
      window.localStorage.removeItem('passwordTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('fullNameTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('rTokenTracuu')
      window.localStorage.removeItem('rolesTracuu')
    } else {
      window.localStorage.clear()
    }
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    // getItem(<Link href={'/'}><a onClick={() => router.push('/') }>Home</Link>, '1', <HomeOutlined />),
    getItem('Danh mục', 'danhmuc', <PicRightOutlined />, [
      getItem(<Link href={'/nhomDoiTuong'}>Nhóm đối tượng</Link>, 'nhomdoituong'),
      getItem(<Link href={'/doituong'}>Đối tượng</Link>, 'doituong'), 
      getItem(<Link href={'/khoa'}>Khoa/ Phòng ban</Link>, 'khoa'), 
      getItem(<Link href={'/loaisach'}>Loại hình sách</Link>, 'loaisach'), 
      getItem(<Link href={'/sach'}>Sách</Link>, 'sach'), 
      getItem(<Link href={'/nhanvien'}>Nhân viên</Link>, 'nhanvien'), 
      getItem(<Link href={'/coso'}>Cơ sở</Link>, 'coso'), 
    ]),
    getItem('Quản lý nhập', 'quanlynhap', <ContainerOutlined />, [
      getItem(<Link href={'/phieunhapmua'}>Nhập mua</Link>, 'phieunhapmua'),
      getItem(<Link href={'/phieunhapin'}>Nhập In-Photo</Link>, 'phieunhapin'),
      getItem(<Link href={'/phieunhapcoso'}>Nhập cơ sở thư viện</Link>, 'phieunhapcoso'),
      getItem(<Link href={'/phieunhapphongban'}>Nhập từ phòng ban</Link>, 'phieunhapphongban'),
    ]),
    getItem('Quản lý xuất', 'quanlyxuat', <ContainerOutlined />, [
      getItem(<Link href={'/xuatcoso'}>Xuất cơ sở thư viện</Link>, 'xuatcoso'),
      getItem(<Link href={'/xuatphathanh'}>Xuất phát hành</Link>, 'xuatphathanh'),
      getItem(<Link href={'/xuatkygui'}>Xuất ký gửi</Link>, 'xuatkygui'),
      getItem(<Link href={'/xuattang'}>Xuất tặng</Link>, 'xuattang'),
      getItem(<Link href={'/xuatthanhly'}>Xuất thanh lý</Link>, 'xuatthanhly'),
      getItem(<Link href={'/xuattra'}>Xuất trả nhà In-Photo</Link>, 'xuattra'),
      getItem(<Link href={'/xuatphongban'}>Xuất phòng ban</Link>, 'xuatphongban'),
      getItem(<Link href={'/xuatmat'}>Xuất mất</Link>, 'xuatmat'),
      getItem(<Link href={'/xuatkhac'}>Xuất khác</Link>, 'xuatkhac'),
    ]),
    getItem('Báo cáo-Thống kê', 'baocao', <PieChartOutlined />, [
      getItem(<Link href={'/bangkenhap'}>Bảng kê nhập</Link>, 'bangkenhap'),
      getItem(<Link href={'/bangkexuat'}>Bảng kê xuất</Link>, 'bangkexuat'),
      getItem(<Link href={'/baocao-nhapxuatton'}>Báo cáo Nhập-Xuất-Tồn</Link>, 'baocao-nhapxuatton'),
      getItem(<Link href={'/baocao-phanphoichenhlech'}>Bảng phân phối chênh lệch</Link>, 'baocao-phanphoichenhlech'),
    ]),
    getItem('Quản trị', 'quantri', <BarChartOutlined />, [
      getItem(<Link href={'/member'}>Người dùng</Link>, 'member'),
      getItem(<Link href={'/permission'}>Phân quyền</Link>, 'permission'),
    ]), 
    getItem('Cài đặt', 'caidat', <SettingOutlined />, [
      getItem(<Link href={'/profile'}>Tài khoản</Link>, 'profile'),
      getItem(<Link href={'/profile'}>Đăng xuất</Link>, '6'), 
    ]), 
  ];

  return(
    <Sider width='40vh' trigger={null} collapsible collapsed={collapsed}>
      {/* <div className={styles.logo}>
        Trung tâm học liệu
      </div> */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys = {['quanlynhap']}
        defaultOpenKeys={['danhmuc', 'quanlynhap', 'quanlyxuat', 'baocao', 'quantri', 'caidat']}
        items={items}
      />
      <div className={styles.version}>
        <Text>Version: 1.0.0</Text>
        <Divider/>
        {/* <Link href={'/help'}><a onClick={() => router.push('/help') }>Hướng dẫn sử dụng</a></Link> */}
      </div>
  </Sider>
  )
}

export default Navbar