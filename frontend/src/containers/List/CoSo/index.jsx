import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Alert, Modal, Space, Input, Table, Form, Tag, Spin, Popconfirm  } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;

const CoSo = () =>{
  const [form] = Form.useForm();
  const [data, setData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
 
  useEffect(()=>{
    loadCoSo()
  },[refresh])

  useEffect(()=>{
    form.setFieldsValue({
        TenCoSo: dataEdit?.TenCoSo,
        DiaChiCoSo: dataEdit?.DiaChiCoSo
    })
  }, [dataEdit])

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    form.setFieldsValue({
      TenCoSo: "",
      DiaChiCoSo: ""
    })
  }

  async function loadCoSo(){
    return await axios
      .get('http://localhost:3001/coso')
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

  async function GetCoSoEdit(MaCoSo){
    setEditMode(true)
    return await axios
      .get(`http://localhost:3001/coso/${MaCoSo}`)
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

  async function CreateCoSo(values){
    
    return await axios
      .post('http://localhost:3001/coso/create', {TenCoSo: values.TenCoSo, DiaChiCoSo: values.DiaChiCoSo})
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

  async function UpdateCoSo(values){
    console.log('run update')
    return await axios
      .post(`http://localhost:3001/coso/${dataEdit?.MaCoSo}`, {TenCoSo: values.TenCoSo, DiaChiCoSo: values.DiaChiCoSo})
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

  async function DeleteCoSo(MaCoSo){
    return await axios
      .post(`http://localhost:3001/coso/delete/${MaCoSo}`)
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
      title: 'Tên cơ sở thư viện',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChiCoSo',
      key: 'DiaChiCoSo',
    },
    {
      title: 'Tình trạng',
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
            {!record.Is_Deleted && <Button key={record.MaCoSo} type="link" onClick= {() =>{GetCoSoEdit(record.MaCoSo)}}>Cập nhật</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="Bạn có chắc xóa cơ sở không?"
                onConfirm={()=>{DeleteCoSo(record.MaCoSo)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaCoSo} type="link" danger >Xóa</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Cơ sở thư viện</Title>
      <Divider />
      <VStack justifyContent={"start"} alignItems="start">
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Thêm mới
            </Button>
          </Space>
          <Divider />
          {loading ? 
            <>
              <Spin tip="Loading..." spinning={loading}>
                <Alert
                  message="Đang lấy dữ liệu"
                  description="Vui lòng chờ trong giây lát."
                  type="info"
                />
              </Spin>
            </> 
            :
              <Table columns={columns} dataSource={data} />}
      </VStack>

      {/* Modal form */}
      <Modal
        open={openModalContact}
        title={!editMode ? "Thêm mới cơ sở thư viện" : "Cập nhật cơ sở thư viên"}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form form={form} 
          name="control-hooks"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={!editMode? CreateCoSo: UpdateCoSo}
        >
          <Form.Item
            label="Tên cơ sở: "
            name="TenCoSo"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên cơ sở!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Địa chỉ cơ sở: "
            name="DiaChiCoSo"            
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

export default CoSo;