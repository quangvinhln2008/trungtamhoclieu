import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, Table, Form, Tag } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const LoaiHinhSach = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  const data = [{
    TENLOAIHINHSACH: "Sách phát hành",
    STATUS: "active"
  },
  {
    TENLOAIHINHSACH: "Sách bán",
   STATUS: "delete"
  }]

  const columns = [
    {
      title: 'Tên loại hình sách',
      dataIndex: 'TENLOAIHINHSACH',
      key: 'TENLOAIHINHSACH',
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
          <Button key={record.TENLOAIHINHSACH} type="link" onClick= {() => console.log(record.TENLOAIHINHSACH)}>Cập nhật</Button>
          <Button key={record.TENLOAIHINHSACH} type="link" danger  onClick= {() => console.log(record.TENLOAIHINHSACH)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Loại hình sách</Title>
      <Divider />
      <VStack justifyContent={"start"} alignItems="start">
      <Space align="left" style={{ marginBottom: 16 }}>
        <Button  onClick={toogleModalFormContact}  type="primary" icon={<PlusCircleOutlined />}>
            Thêm mới
          </Button>
        </Space>
        <Divider />
        <Table columns={columns} dataSource={data} />
      </VStack>

      {/* Modal thêm mới */}
      <Modal
        open={openModalContact}
        title="Thêm mới loại hình sách"
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
            label="Tên loại hình sách: "
            name="TENLOAIHINHSACH"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên loại hình sách!'
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

export default LoaiHinhSach;