import React, {useState, useEffect} from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Select, Modal, Result, Space, Input, InputNumber, Table, Form, Tag, Popconfirm , Alert, Spin} from 'antd';
import { SearchOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Sach = () =>{
  
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [data, setData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [dataDoiTuong, setDataDoiTuong] = useState()
  const [dataKhoa, setDataKhoa] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [options, setOption] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsKhoa, setOptionKhoa] = useState()

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }
    
  function toogleModalFormFilter(){
    setOpenModalFilter(!openModalFilter)
  }

  useEffect(()=>{
    setTimeout(() => {    
      setLoading(true)
      loadSach()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    
    setOption(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionKhoa(dataKhoa?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
        TenSach: dataEdit?.TenSach,
        MaDoiTuong: dataEdit?.MaDoiTuong,
        MaKhoa: dataEdit?.MaKhoa,
        MaLoaiHinhSach: dataEdit?.MaLoaiHinhSach,
        NamXuatBan: dataEdit?.NamXuatBan,
        Barcode : dataEdit?.Barcode,
        GiaBan : dataEdit?.GiaBan
    })
  }, [dataEdit])

  function resetData(){    
    formFilter.setFieldsValue({
      TenSach: "",
      MaDoiTuong: "",
      MaKhoa: "",
  })
    setLoading(true)
    setTimeout(() => {    
      loadSach()
    }, 1000);
    
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    setOption(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionKhoa(dataKhoa?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
      TenSach: "",
      MaDoiTuong: "",
      MaKhoa:"",
      NamXuatBan: "",
      Barcode : "",
      GiaBan : 0
    })
  }
  function openFilterMode(){
    setOpenModalFilter(!openModalFilter)

    setOption(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));    
  }
  async function loadSach(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/Sach')
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setData(result.data[0])
        setDataDoiTuong(result.data[1])
        setDataLoaiHinhSach(result.data[2])
        setDataKhoa(result.data[3])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function GetSachEdit(MaSach){
    setEditMode(true)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/Sach/${MaSach}`)
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

  async function CreateSach(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/Sach/create', {
        TenSach: values.TenSach, 
        MaDoiTuong: values.MaDoiTuong, 
        MaKhoa: values.MaKhoa, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        NamXuatBan: values.NamXuatBan, 
        Barcode: values.Barcode, 
        GiaBan: values.GiaBan,
        DienGiaiSach : values.DienGiaiSach
      })
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

  async function UpdateSach(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/Sach/${dataEdit?.MaSach}`, {
        TenSach: values.TenSach, 
        MaDoiTuong: values.MaDoiTuong, 
        MaKhoa: values.MaKhoa, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        NamXuatBan: values.NamXuatBan, 
        Barcode: values.Barcode, 
        GiaBan: values.GiaBan,
        DienGiaiSach: values.DienGiaiSach
      })
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

  async function DeleteSach(MaSach){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/Sach/delete/${MaSach}`)
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
  
  async function filterSach(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/sach/filter', {
        TenSach: values.TenSach, 
        MaDoiTuong: values.MaDoiTuong
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
          setDataDoiTuong(result.data[1])       
        
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
      title: 'T??n s??ch',
      dataIndex: 'TenSach',
      key: 'TenSach',
    },
    {
      title: 'NXB/ Nh?? in',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
    },
    {
      title: 'N??m xu???t b???n',
      dataIndex: 'NamXuatBan',
      key: 'NamXuatBan',
      align:'center'
    },
    {
      title: 'Gi?? ph??t h??nh',
      dataIndex: 'GiaBan',
      align:'right',
      key: 'GiaBan',
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
            {!record.Is_Deleted && <Button key={record.MaSach} type="link" onClick= {() =>{GetSachEdit(record.MaSach)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a s??ch kh??ng?"
                onConfirm={()=>{DeleteSach(record.MaSach)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.MaSach} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
        
      ),
    },
  ];

  return(
    <>
      <Title level={3}>S??ch</Title>
      <Divider />
      <>
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Th??m m???i
          </Button>
          <Button  onClick={openFilterMode} icon={<SearchOutlined />}>
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
        title={!editMode ? "Th??m m???i s??ch" : "C???p nh???t s??ch"}
        // onOk={submitChangeEmail}
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
          onFinish={!editMode? CreateSach: UpdateSach}
        >
          <Form.Item
            label="T??n s??ch: "
            name="TenSach"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p t??n s??ch!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Lo???i h??nh s??ch: "
            name="MaLoaiHinhSach"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n lo???i h??nh s??ch!'
              },
            ]}
          >
          <Select 
            showSearch 
            optionFilterProp="children"
            filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
            filterSort={(optionA, optionB) =>
              optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
            }

            >
              {optionsLoaiHinhSach}
            </Select>
          </Form.Item>
          <Form.Item
            label="Nh?? xu???t b???n/ Nh?? in: "
            name="MaDoiTuong"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n NXB!'
              },
            ]}
          >
          <Select 
            showSearch 
            optionFilterProp="children"
            filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
            filterSort={(optionA, optionB) =>
              optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
            }

            >
              {options}
            </Select>
          </Form.Item>
          <Form.Item
            label="Khoa/ Ph??ng ban: "
            name="MaKhoa"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n Khoa/ Ph??ng ban!'
              },
            ]}
          >
          <Select 
            showSearch 
            optionFilterProp="children"
            filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
            filterSort={(optionA, optionB) =>
              optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
            }

            >
              {optionsKhoa}
            </Select>
          </Form.Item>
          <Form.Item
            label="N??m xu???t b???n: "
            name="NamXuatBan"
            
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Di???n gi???i: "
            name="DienGiaiSach"
            
          >
          <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Barcode: "
            name="Barcode"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p Barcode!'
              },
            ]}
          >
          <Input  />
          </Form.Item>
          <Form.Item
            label="Gi?? ph??t h??nh: "
            name="GiaBan"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p gi?? ph??t h??nh!'
              },
            ]}
          >
          <InputNumber 
            style={{
              width: 150,
              padding :'0px 20px'
            }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            min={0}  
            defaultValue={0} />
          </Form.Item>

          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormContact}>Tho??t</Button>
            <Button key="save" type="primary"  htmlType="submit">L??u</Button>
          </HStack>
        </Form>
      </Modal>

      {/* Modal t??m ki???m */}
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
          onFinish={filterSach}
        >
          <Form.Item
            label="T??n s??ch: "
            name="TenSach"           
          >
          <Input  />
          </Form.Item>
          
          <Form.Item
            label="Nh?? xu???t b???n/ Nh?? in: "
            name="MaDoiTuong"
          >
          <Select 
            showSearch 
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
            filterSort={(optionA, optionB) =>
              optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
            }

            >
              {options}
            </Select>
          </Form.Item>          

          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormFilter}>Tho??t</Button>
            <Button key="save" type="primary"  htmlType="submit">T??m</Button>
          </HStack>
        </Form>
      </Modal>
    </>
  )
}

export default Sach;