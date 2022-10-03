import React, {useState, useEffect} from "react";
import { Divider, Typography, Button, Select, Modal, Space, Input, InputNumber, Table, Form, Tag, DatePicker } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const TonDauKy = () =>{
  
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  const data = [
    {
      NGAYCT:"2022-10-01",
      TENCOSO: "778 Nguyễn Kiệm",
      LOAIHINHSACH: 'Sách phát hành',
      TENSACH: 'Kinh tế vi mô 1',
      SOLUONGTON: '10',
      DONGIATON: '35000',
      STATUS: "active"
    },
    {
      NGAYCT:"2022-10-01",
      TENCOSO: "778 Nguyễn Kiệm",
      LOAIHINHSACH: 'Sách phát hành',
      TENSACH: 'Kinh tế vi mô 1',
      SOLUONGTON: '10',
      DONGIATON: '35000',
      STATUS: "active"
    },
    {
      NGAYCT:"2022-10-01",
      TENCOSO: "778 Nguyễn Kiệm",
      LOAIHINHSACH: 'Sách phát hành',
      TENSACH: 'Kinh tế vi mô 1',
      SOLUONGTON: '10',
      DONGIATON: '35000',
      STATUS: "active"
    },
    {
      NGAYCT:"2022-10-01",
      TENCOSO: "778 Nguyễn Kiệm",
      LOAIHINHSACH: 'Sách phát hành',
      TENSACH: 'Kinh tế vi mô 1',
      SOLUONGTON: '10',
      DONGIATON: '35000',
      STATUS: "active"
    }]

  const columns = [
    {
      title: 'Ngày tồn',
      dataIndex: 'NGAYCT',
      key: 'NGAYCT',
    },
    {
      title: 'Cơ sở',
      dataIndex: 'TENCOSO',
      key: 'TENCOSO',
    },
    {
      title: 'Loại hình sách',
      dataIndex: 'LOAIHINHSACH',
      key: 'LOAIHINHSACH',
    },
    {
      title: 'Tên sách',
      dataIndex: 'TENSACH',
      key: 'TENSACH',
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'SOLUONGTON',
      key: 'SOLUONGTON',
    },
    {
      title: 'Đơn giá tồn',
      dataIndex: 'DONGIATON',
      key: 'DONGIATON',
    },
    // {
    //   title: 'Tình trạng',
    //   key: 'STATUS',
    //   dataIndex: 'STATUS',
    //   render: (_, { STATUS }) => (                   
    //       <Tag color={STATUS === 'active' ? 'green' : 'volcano'} key={STATUS}>
    //         {STATUS.toUpperCase()}
    //       </Tag>         
    //   )
    // },
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
      <Title level={3}>Tồn kho sách đầu kỳ</Title>
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
        title="Thêm mới tồn kho sách"
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
            label="Ngày tồn: "
            name="NGAYCT"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày tồn kho!'
              },
            ]}
          >
          <DatePicker />
          </Form.Item>
          
          <Form.Item
            label="Cơ sở thư viện: "
            name="TENCOSO"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn cơ sở thư viện!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Loại hình sách: "
            name="LOAIHINHSACH"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại hình sách!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Tên sách: "
            name="TENSACH"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tên sách!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Số lượng tồn: "
            name="SOLUONGTON"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số lượng tồn kho!'
              },
            ]}
          >
          <InputNumber min={0}  defaultValue={1} />
          </Form.Item>
          <Form.Item
            label="Đơn giá tồn: "
            name="DONGIATON"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập đơn giá tồn!'
              },
            ]}
          >
          <InputNumber min={1000}  defaultValue={0} />
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

export default TonDauKy;