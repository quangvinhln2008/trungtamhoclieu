import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Alert, Modal, Result, Space, Input, Table, Form, Tag, Spin, Popconfirm  } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const LoaiHinhSach = () =>{

  const [form] = Form.useForm();
  const [data, setData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  useEffect(()=>{
    setTimeout(() => {    
      setLoading(true)
      loadLoaiHinhSach()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    form.setFieldsValue({
        TenLoaiHinhSach: dataEdit?.TenLoaiHinhSach
    })
  }, [dataEdit])

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    form.setFieldsValue({
      TenLoaiHinhSach: "",
    })
  }

  async function loadLoaiHinhSach(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/loaihinhsach')
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordset,
        }
        setData(res.data.result.recordset)
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function GetLoaiHinhSachEdit(MaLoaiHinhSach){
    setEditMode(true)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/loaihinhsach/${MaLoaiHinhSach}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        setDataEdit(result.data[0])
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function CreateLoaiHinhSach(values){
    
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/loaihinhsach/create', {TenLoaiHinhSach: values.TenLoaiHinhSach, DiaChiLoaiHinhSach: values.DiaChiLoaiHinhSach})
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        setRefresh(!refresh)
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function UpdateLoaiHinhSach(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/loaihinhsach/${dataEdit?.MaLoaiHinhSach}`, {TenLoaiHinhSach: values.TenLoaiHinhSach, DiaChiLoaiHinhSach: values.DiaChiLoaiHinhSach})
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        setRefresh(!refresh)
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function DeleteLoaiHinhSach(MaLoaiHinhSach){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/loaihinhsach/delete/${MaLoaiHinhSach}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        setRefresh(!refresh)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  const columns = [
    {
      title: 'T??n lo???i h??nh s??ch',
      dataIndex: 'TenLoaiHinhSach',
      key: 'TenLoaiHinhSach',
    },
    {
      title: 'T??nh tr???ng',
      key: 'Is_Deleted',
      dataIndex: 'Is_Deleted',
      render: (_, record) => (                   
          <Tag color={record.Is_Deleted ? 'volcano' :'green'} key={record.MaCoSo}>
            {record.Is_Deleted ? 'DELETED': 'ACTIVE'}
          </Tag>         
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
          <Space size="middle">
            {!record.Is_Deleted && <Button key={record.MaLoaiHinhSach} type="link" onClick= {() =>{GetLoaiHinhSachEdit(record.MaLoaiHinhSach)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a lo???i h??nh s??ch kh??ng?"
                onConfirm={()=>{DeleteLoaiHinhSach(record.MaLoaiHinhSach)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaLoaiHinhSach} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Lo???i h??nh s??ch</Title>
      <Divider />
      <>
      <Space align="left" style={{ marginBottom: 16 }}>
        <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
            Th??m m???i
          </Button>
        </Space>
        <Divider />
          {loading ? 
            <>
              <Spin size="large" spinning={loading}>                
                <Result
                  title="??ang t???i d??? li???u....."                  
                />
              </Spin>
            </> 
            :
              <Table columns={columns} dataSource={data} />}
      </>

      {/* Modal th??m m???i */}
      <Modal
        open={openModalContact}
        title={!editMode ? "Th??m m???i lo???i h??nh s??ch" : "C???p nh???t lo???i h??nh s??ch"}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form form={form} 
          name="control-hooks"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={!editMode? CreateLoaiHinhSach: UpdateLoaiHinhSach}
        >
          <Form.Item
            label="T??n lo???i h??nh s??ch: "
            name="TenLoaiHinhSach"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p t??n lo???i h??nh s??ch!'
              },
            ]}
          >
          <Input  />
          </Form.Item>

          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormContact}>Tho??t</Button>
            <Button key="save" type="primary"  htmlType="submit">L??u</Button>
          </HStack>
        </Form>
      </Modal>
    </>
  )
}

export default LoaiHinhSach;