import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, Table, Form, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const DoiTuong = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  const data = [
    {
      TENDOITUONG: "Phòng Quản lý khoa hoc",
      TENNHOMDOITUONG: 'Phòng ban/ Khoa',
      STATUS: "active"
    },
    {
      TENDOITUONG: "Khoa Marketing",
      TENNHOMDOITUONG: 'Phòng ban/ Khoa',
      STATUS: "active"
    },
    {
      TENDOITUONG: "Nhà in Sự Thật",
      TENNHOMDOITUONG: 'Nhà In',
      STATUS: "active"
    },
    {
      TENDOITUONG: "Nhà xuất bàn Kinh tế",
      TENNHOMDOITUONG: 'Nhà xuất bản',
      STATUS: "active"
    }]

  const columns = [
    {
      title: 'Tên nhóm đối tượng',
      dataIndex: 'TENNHOMDOITUONG',
      key: 'TENNHOMDOITUONG',
    },
    {
      title: 'Tên đối tượng',
      dataIndex: 'TENDOITUONG',
      key: 'TENDOITUONG',
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
          <Button key={record.TENCOSO} type="link" onClick= {() => console.log(record.TENCOSO)}>Cập nhật</Button>
          <Button key={record.TENCOSO} type="link" danger  onClick= {() => console.log(record.TENCOSO)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Đối tượng</Title>
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
        title="Thêm mới đối tượng"
        // onOk={submitChangeEmail}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form
          name="basic"
          labelCol={{
            span: 6,
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
          <Form.Item
            label="Tên cơ sở: "
            name="TENCOSO"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên cơ sở!'
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

export default DoiTuong;