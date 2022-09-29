import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, Table, Form, Tag, DatePicker } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const HocKy = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const data = [{
    TUNGAY: "2022-01-01",
    DENGAY: "2022-05-30",
    HOCKY: "Học kỳ I năm 2022",
    STATUS: "active"
  },
  {
    TUNGAY: "2022-06-01",
    DENGAY: "2022-08-30",
    HOCKY: "Học kỳ II năm 2022",
    STATUS: "active"
  },
  {
    TUNGAY: "2022-09-01",
    DENGAY: "2022-12-30",
    HOCKY: "Học kỳ III năm 2022",
    STATUS: "active"
  }]

  const columns = [
    {
      title: 'Học kỳ',
      dataIndex: 'HOCKY',
      key: 'HOCKY',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'TUNGAY',
      key: 'TUNGAY',
    },{
      title: 'Đến ngày',
      dataIndex: 'DENGAY',
      key: 'DENGAY',
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
          <Button key={record.HOCKY} type="link" onClick= {() => console.log(record.HOCKY)}>Cập nhật</Button>
          <Button key={record.HOCKY} type="link" danger  onClick= {() => console.log(record.HOCKY)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Học kỳ</Title>
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
        title="Thêm mới học kỳ"
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
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          // onFinish={submitContact}
        >
          <Form.Item
            label="Học kỳ: "
            name="HOCKY"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên học kỳ!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Từ ngày: "
            name="TUNGAY"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày bắt đầu học kỳ!'
              },
            ]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Đến ngày: "
            name="DENNGAY"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày kết thúc học kỳ!'
              },
            ]}
          >
            <DatePicker onChange={onChange} />
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

export default HocKy;