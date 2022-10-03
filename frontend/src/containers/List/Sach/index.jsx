import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, Table, Form, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const Sach = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  const data = [
    {
      TENSACH: "Kinh tế vi mô 1",
      NHASUATBAN: 'NXB Kinh tế',
      NAMXUATBAN: '2021',
      STATUS: "active"
    },
    {
      TENSACH: "Kinh tế vi mô 1",
      NHASUATBAN: 'NXB Kinh tế',
      NAMXUATBAN: '2021',
      STATUS: "active"
    },
    {
      TENSACH: "Kinh tế vi mô 1",
      NHASUATBAN: 'NXB Kinh tế',
      NAMXUATBAN: '2021',
      STATUS: "active"
    },
    {
      TENSACH: "Kinh tế vi mô 1",
      NHASUATBAN: 'NXB Kinh tế',
      NAMXUATBAN: '2021',
      STATUS: "active"
    }]

  const columns = [
    {
      title: 'Tên sách',
      dataIndex: 'TENSACH',
      key: 'TENSACH',
    },
    {
      title: 'NXB/ Nhà in',
      dataIndex: 'NHASUATBAN',
      key: 'NHASUATBAN',
    },
    {
      title: 'Năm xuất bản',
      dataIndex: 'NAMXUATBAN',
      key: 'NAMXUATBAN',
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
          <Button key={record.TENSACH} type="link" onClick= {() => console.log(record.TENSACH)}>Cập nhật</Button>
          <Button key={record.TENSACH} type="link" danger  onClick= {() => console.log(record.TENSACH)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Sách</Title>
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
        title="Thêm mới sách"
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
          <Form.Item
            label="Tên sách: "
            name="TENSACH"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sách!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          
          <Form.Item
            label="Nhà xuất bản/ Nhà in: "
            name="NHAXUATBAN"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập NXB!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Năm xuất bản: "
            name="NAMXUATBAN"
            
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Barcode: "
            name="BARCODE"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Barcode!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Giá bán: "
            name="GIABAN"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá bán!'
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

export default Sach;