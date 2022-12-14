import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Select, Result, Modal, Space, Input, Table, Form, Tag, Popconfirm , Alert, Spin} from 'antd';
import { SearchOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const DoiTuong = () =>{
  
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [data, setData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [dataNhomDoiTuong, setDataNhomDoiTuong] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalFilter, setOpenModalFilter] = useState(false)

  useEffect(()=>{    
    setTimeout(() => {    
      setLoading(true)
      loadDoiTuong()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    form.setFieldsValue({
        TenDoiTuong: dataEdit?.TenDoiTuong,
        MaNhomDoiTuong: dataEdit?.MaNhomDoiTuong
    })
  }, [dataEdit])

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }
  
  function toogleModalFormFilter(){
    setOpenModalFilter(!openModalFilter)
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    form.setFieldsValue({
      TenDoiTuong: "",
      MaNhomDoiTuong: ""
    })
  }

  function resetData(){    
    formFilter.setFieldsValue({
      MaNhomDoiTuong: ''
     
  })
    setLoading(true)
    setTimeout(() => {    
      loadDoiTuong()
    }, 1000);
    
  }

  async function loadDoiTuong(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/DoiTuong')
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setData(result.data[0])
        setDataNhomDoiTuong(result.data[1])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function GetDoiTuongEdit(MaDoiTuong){
    setEditMode(true)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/DoiTuong/${MaDoiTuong}`)
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

  async function CreateDoiTuong(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/DoiTuong/create', {TenDoiTuong: values.TenDoiTuong, MaNhomDoiTuong: values.MaNhomDoiTuong})
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

  async function UpdateDoiTuong(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/DoiTuong/${dataEdit?.MaDoiTuong}`, {TenDoiTuong: values.TenDoiTuong, MaNhomDoiTuong: values.MaNhomDoiTuong})
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

  async function DeleteDoiTuong(MaDoiTuong){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/DoiTuong/delete/${MaDoiTuong}`)
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
  
  async function filterDoiTuong(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/doituong/filter', {
        MaNhomDoiTuong: values.MaNhomDoiTuong, 
      })
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordsets,
        }
        setLoading(true)
        setOpenModalFilter(!openModalFilter)
        setTimeout(() => {
          setData(result.data[0])
          setDataNhomDoiTuong(result.data[1])
          setLoading(false)
        }, 1000);
        
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
      title: 'Nh??m ?????i t?????ng',
      dataIndex: 'TenNhomDoiTuong',
      key: 'TenNhomDoiTuong',
    },
    {
      title: 'T??n nh?? cung c???p',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
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
            {!record.Is_Deleted && <Button key={record.MaDoiTuong} type="link" onClick= {() =>{GetDoiTuongEdit(record.MaDoiTuong)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a ?????i t?????ng kh??ng?"
                onConfirm={()=>{DeleteDoiTuong(record.MaDoiTuong)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaDoiTuong} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>?????i t?????ng</Title>
      <Divider />
      <>
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Th??m m???i
          </Button>
          <Button  onClick={toogleModalFormFilter} icon={<SearchOutlined />}>
              T??m ki???m
          </Button>
          <Button onClick={resetData} type="default" icon={<ReloadOutlined />}>
              Reload
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
        title={!editMode ? "Th??m m???i ?????i t?????ng" : "C???p nh???t ?????i t?????ng"}
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
          onFinish={!editMode? CreateDoiTuong: UpdateDoiTuong}
        >
          <Form.Item
            label="T??n ?????i t?????ng: "
            name="TenDoiTuong"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p t??n c?? s???!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Nh??m ?????i t?????ng: "
            name="MaNhomDoiTuong"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n nh??m ?????i t?????ng!'
              },
            ]}
          >
          <Select options={dataNhomDoiTuong} />
          </Form.Item>

          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormContact}>Tho??t</Button>
            <Button key="save" type="primary"  htmlType="submit">L??u</Button>
          </HStack>
        </Form>
      </Modal>

      {/* Modal tim ki???m */}
      <Modal
         open={openModalFilter}
         title={"T??m ki???m n??ng cao"}
         onCancel={toogleModalFormFilter}
        footer={null}
      >
      <Form form={formFilter} 
          name="control-hooks"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={filterDoiTuong}
        >          
          <Form.Item
            label="Nh??m ?????i t?????ng: "
            name="MaNhomDoiTuong"            
          >
          <Select options={dataNhomDoiTuong} />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormFilter}>Tho??t</Button>
            <Button key="save" type="primary"  htmlType="T??m">T??m</Button>
          </HStack>
        </Form>
      </Modal>
    </>
  )
}

export default DoiTuong;