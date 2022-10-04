import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, Table, Form, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const NhanVien = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  const data = [
    {
      MANV:"001",
      TENNV: "Võ Khôi Thọ",
      ROLE: 'ADMIN',
      STATUS: "active"
    },
    {
      MANV:"002",
      TENNV: "Nguyễn Thị Trúc Hà",
      ROLE: 'ADMIN',
      STATUS: "active"
    },
    {
      MANV:"003",
      TENNV: "Vũ Thị Mỹ Hạnh",
      ROLE: 'ADMIN',
      STATUS: "active"
    },
    {
      MANV:"004",
      TENNV: "Hoàng Thị Hiên",
      ROLE: 'USER',
      STATUS: "active"
    }]

  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'MANV',
      key: 'MANV',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'TENNV',
      key: 'TENNV',
    },
    {
      title: 'Quyền truy cập',
      dataIndex: 'ROLE',
      key: 'ROLE',
    },
    {
      title: 'Tình trạng',
      key: 'STATUS',
      dataIndex: 'STATUS',
      render: (_, { STATUS }) => (                   
          <Tag color={STATUS === 'active' ? 'green' : 'volcano'} key={STATUS}>
            {STATUS.toUpperCase()}
          </Tag>         
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button key={record.MANV} type="link" onClick= {() => console.log(record.MANV)}>Cập nhật</Button>
          <Button key={record.MANV} type="link" danger  onClick= {() => console.log(record.MANV)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Nhân viên</Title>
      <Divider />
      <VStack justifyContent={"start"} alignItems="start">
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={toogleModalFormContact}  type="primary" icon={<PlusCircleOutlined />}>
              Thêm mới
          </Button>
          <Button  onClick={toogleModalFormContact} icon={<SearchOutlined />}>
              Tìm kiếm
          </Button>
        </Space>
        <Divider />
        <Table columns={columns} dataSource={data} />
      </VStack>

      {/* Modal thêm mới */}
      <Modal
        open={openModalContact}
        title="Thêm mới nhân viên"
        // onOk={submitChangeEmail}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          // onFinish={submitContact}
        >
          <Divider plain>Thông tin nhân viên</Divider>
          <Form.Item
            label="Mã nhân viên: "
            name="MANV"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã nhân viên!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          
          <Form.Item
            label="Tên nhân viên: "
            name="TENNV"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên nhân viên!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Cơ sở: "
            name="COSO"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn cơ sở!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Divider plain>Thông tin đăng nhập</Divider>
          <Form.Item
            label="Tên đăng nhập: "
            name="TENDANGNHAP"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Mật khẩu đăng nhập: "
            name="MATKHAUDANGNHAP"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              },
            ]}
          >
          <Input.Password  />
          </Form.Item>
          <Form.Item
            label="Quyền truy cập: "
            name="ROLE"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn quyền truy cập!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormContact}>Thoát</Button>
            <Button key="save" type="primary"  htmlType="submit">Lưu</Button>
          </HStack>
        </Form>
      </Modal>
    </>
  )
}

export default NhanVien;