import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Divider, Typography, Button, Alert, Modal, Result, Space, Input, Table, Form, Tag, Spin, Popconfirm, DatePicker  } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const HocKy = () =>{
  
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
      loadHocKy()
    }, 1000);
  },[refresh])
  
useEffect(()=>{
    
    form.setFieldsValue({
        TenHocKy: dataEdit?.TenHocKy,
        TuNgay: moment(dataEdit?.TuNgay, 'YYYY/MM/DD'),
        DenNgay: moment(dataEdit?.DenNgay, 'YYYY/MM/DD')
    })
  }, [dataEdit])

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    form.setFieldsValue({
      TenHocKy: "",
      TuNgay: "",
      DenNgay: ""
    })
  }

  async function loadHocKy(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/hocky')
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

  async function GetHocKyEdit(MaHocKy){
    
    setEditMode(true)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/hocky/${MaHocKy}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset[0],
        }
        setDataEdit(result.data)
        setOpenModalContact(!openModalContact)

        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function CreateHocKy(values){
    console.log('values', values)
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/hocky/create', {TenHocKy: values.TenHocKy, TuNgay: values.TuNgay, DenNgay: values.DenNgay})
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

  async function UpdateHocKy(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/hocky/${dataEdit?.MaHocKy}`, {TenHocKy: values.TenHocKy, TuNgay: values.TuNgay.format('YYYY-MM-DD'), DenNgay: values.DenNgay.format('YYYY-MM-DD')})
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

  async function DeleteHocKy(MaHocKy){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/hocky/delete/${MaHocKy}`)
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
      title: 'H???c k???',
      dataIndex: 'TenHocKy',
      key: 'TenHocKy',
    },
    {
      title: 'T??? ng??y',
      dataIndex: 'TuNgay',
      key: 'TuNgay',
    },{
      title: '?????n ng??y',
      dataIndex: 'DenNgay',
      key: 'DenNgay',
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
            {!record.Is_Deleted && <Button key={record.MaCoSo} type="link" onClick= {() =>{GetHocKyEdit(record.MaHocKy)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a h???c k??? kh??ng?"
                onConfirm={()=>{DeleteHocKy(record.MaHocKy)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaHocKy} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>H???c k???</Title>
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
        title={!editMode ? "Th??m m???i h???c k???" : "C???p nh???t h???c k???"}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form form={form} 
          name="control-hooks"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={!editMode? CreateHocKy: UpdateHocKy}
        >
          <Form.Item
            label="H???c k???: "
            name="TenHocKy"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p t??n h???c k???!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="T??? ng??y: "
            name="TuNgay"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p ng??y b???t ?????u h???c k???!'
              },
            ]}
          >
            <DatePicker format={"DD-MM-YYYY"}   />
          </Form.Item>
          <Form.Item
            label="?????n ng??y: "
            name="DenNgay"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p ng??y k???t th??c h???c k???!'
              },
            ]}
          >
            <DatePicker format={"DD-MM-YYYY"} />
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

export default HocKy;