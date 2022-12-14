import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Alert, Result, Modal, Space, Input, Table, Form, Tag, Spin, Popconfirm  } from 'antd';
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
    setTimeout(() => {    
      setLoading(true)
      loadCoSo()
    }, 1000);
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
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/coso')
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
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/coso/${MaCoSo}`)
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
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/coso/create', {TenCoSo: values.TenCoSo, DiaChiCoSo: values.DiaChiCoSo})
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
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/coso/${dataEdit?.MaCoSo}`, {TenCoSo: values.TenCoSo, DiaChiCoSo: values.DiaChiCoSo})
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
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/coso/delete/${MaCoSo}`)
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
      title: 'T??n c?? s??? th?? vi???n',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: '?????a ch???',
      dataIndex: 'DiaChiCoSo',
      key: 'DiaChiCoSo',
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
            {!record.Is_Deleted && <Button key={record.MaCoSo} type="link" onClick= {() =>{GetCoSoEdit(record.MaCoSo)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a c?? s??? kh??ng?"
                onConfirm={()=>{DeleteCoSo(record.MaCoSo)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaCoSo} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>C?? s??? th?? vi???n</Title>
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

      {/* Modal form */}
      <Modal
        open={openModalContact}
        title={!editMode ? "Th??m m???i c?? s??? th?? vi???n" : "C???p nh???t c?? s??? th?? vi???n"}
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
            label="T??n c?? s???: "
            name="TenCoSo"
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
            label="?????a ch??? c?? s???: "
            name="DiaChiCoSo"            
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

export default CoSo;