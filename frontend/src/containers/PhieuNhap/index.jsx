import React, {useState, useEffect} from "react";
import {useSearchParams, setSearchParams} from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { Divider,Modal, Typography, Button, Select, Space, Result, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin, Col, Row} from 'antd';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter  } from "@chakra-ui/react";
import { SearchOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import {VStack, HStack, cookieStorageManager} from  '@chakra-ui/react';
import { useCookies } from 'react-cookie';

const { Title } = Typography;
const { Option } = Select;

const PhieuNhap = () =>{
  const _ = require("lodash");  
  
  const [cookies, setCookie] = useCookies(['user']);
  
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [data, setData] = useState()
  const [dataChiTiet, setDataChiTiet] = useState()
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [dataEditCt, setDataEditCt] = useState()
  const [dataSach, setDataSach] = useState()
  const [dataCoSo, setDataCoSo] = useState()
  const [dataDoiTuong, setDataDoiTuong] = useState()
  const [dataNhanVien, setDataNhanVien] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)  
  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [optionsSach, setOptionSach] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsCoSo, setOptionCoSo] = useState()
  const [optionsCoSoX, setOptionCoSoX] = useState()
  const [optionsDoiTuong, setOptionDoiTuong] = useState()
  const [optionsNhanVien, setOptionNhanVien] = useState()
  const [tongSoLuongNhap,setTongSoLuongNhap] = useState(0)
  const [tongThanhTienNhap,setTongThanhTienNhap] = useState(0)
  const [maCt, setMaCt] = useState('')
  const [title, setTitle] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  
  const Ident = uuidv4()
  const type = searchParams.get('type')
  const fieldsForm = form.getFieldsValue()
  
  const getHeader = function () {
    const rToken = cookies.rToken
    return {
      Authorization: 'Bearer ' + rToken,
    }
  }

  function getMaCt (type)
  {
    switch (type.toLowerCase()) {
      case 'nhapmua':
        return setMaCt("NM");
      case 'nhapin':
        return setMaCt("NI");
      case 'nhapcoso':
         return setMaCt("NCS");
      case 'nhapphongban':
        return setMaCt("NPB");
      default: 
        return ''
    }
  }

  function getTitle (type)
  {
    switch (type.toLowerCase()) {
      case 'nhapmua':
        return setTitle("nh???p mua");
      case 'nhapin':
        return setTitle("nh???p In - Photo");
      case 'nhapcoso':
         return setTitle("nh???p c?? s???");
      case 'nhapphongban':
        return setTitle("nh???p Ph??ng/ Khoa");
      default: 
        return ''
    }
  }

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  } 
  
  function toogleModalFormFilter(){
    setOpenModalFilter(!openModalFilter)
  }

  useEffect(()=>{
    getMaCt(type)
    getTitle(type)
    setLoading(true)
    setTimeout(() => { 
      loadPhieuNhap()
    }, 1000);
  },[type])
  

  useEffect(()=>{
    setTimeout(() => {    
      setLoading(true)
      loadPhieuNhap()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    
    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSoX(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
    setTongSoLuongNhap(_?.sumBy(dataEditCt, 'SoLuongNhap'))    
    setTongThanhTienNhap(_?.sumBy(dataEditCt, 'ThanhTienNhap'))

    form.setFieldsValue({
        NgayCt: moment(dataEdit?.NgayCt, 'YYYY/MM/DD'),
        SoCt: dataEdit?.SoCt,
        MaLoaiHinhSach: dataEdit?.MaLoaiHinhSach,
        MaCoSo : dataEdit?.MaCoSo,
        MaCoSoX : dataEdit?.MaCoSoX,
        MaDoiTuong: dataEdit?.MaDoiTuong,
        MaNhanVien: cookies.id,
        HTThanhToan: dataEdit?.HTThanhToan,
        DienGiai: dataEdit?.DienGiai,
        users: dataEditCt
    })
  }, [dataEdit])


  function openCreateMode(){
    setEditMode(false)
    setViewMode(true)
    setOpenModalContact(!openModalContact)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSoX(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    setTongSoLuongNhap(0)
    setTongThanhTienNhap(0)

    form.setFieldsValue({
        NgayCt: moment(),
        SoCt: "",
        MaDoiTuong: "",
        MaNhanVien: "",
        MaLoaiHinhSach: "",
        MaCoSo : "",
        MaCoSoX : "",
        DienGiai : "",
        HTThanhToan:"",
        users:[]
    })
  }

  function openFilterMode(){
    setOpenModalFilter(!openModalFilter)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSoX(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

  }

  const onDonGiaChange = (name) => {
    
    const fields = form.getFieldsValue()
    const { users } = fields

    Object.assign(users[name], { ThanhTienNhap: fields.users[name].SoLuongNhap * fields.users[name].DonGiaNhap })
    form.setFieldsValue({users})
    setTongSoLuongNhap(_?.sumBy(users, 'SoLuongNhap'))    
    setTongThanhTienNhap(_?.sumBy(users, 'ThanhTienNhap'))
  }
  
  function resetData(){    
    formFilter.setFieldsValue({
      TenSach: "",
      MaDoiTuong: "",
  })
    setLoading(true)
    setTimeout(() => {    
      loadPhieuNhap()
    }, 1000);
    
  }

  async function loadPhieuNhap(){
    const header = getHeader()
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap?type=${type}`,{headers:header})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setData(result.data[0])
        setDataCoSo(result.data[1])
        setDataLoaiHinhSach(result.data[2])
        setDataSach(result.data[3])
        setDataNhanVien(result.data[4])
        setDataDoiTuong(result.data[5])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function filterPhieuNhap(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/filter', {        
        NgayCt1: values?.NgayCt1 === undefined || values?.NgayCt1 === null ? '' : values?.NgayCt1.format("YYYY-MM-DD"),
        NgayCt2: values?.NgayCt2 === undefined || values?.NgayCt2 === null ? '' : values?.NgayCt2.format("YYYY-MM-DD"),
        MaCt: maCt,
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaSach: values.MaSach, 
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: cookies.id,
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
          setDataCoSo(result.data[1])
          setDataLoaiHinhSach(result.data[2])
          setDataSach(result.data[3])
          setDataNhanVien(result.data[4])
          setDataDoiTuong(result.data[5])  
        
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

  async function GetPhieuNhapEdit(MaPhieuNhap, isEdit){
    setEditMode(isEdit)
    setViewMode(isEdit)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/${MaPhieuNhap}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordsets,
        }
        
        setDataEdit(result.data[0][0])
        setDataEditCt(result.data[1])
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function CreatePhieuNhap(values){
    const header = getHeader()
    console.log('values', values)
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/create', {
        Ident: Ident,
        NgayCt: values.NgayCt.format("YYYY-MM-DD"),
        MaCt: maCt,
        LoaiCt: '1',
        SoCt: values.SoCt, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaCoSoX: values.MaCoSoX, 
        MaSach: values.MaSach, 
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: cookies.id,
        DienGiai: values.DienGiai,
        ctPhieuNhap: values.users  
      },{header})
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

  async function UpdatePhieuNhap(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/${dataEdit?.Ident}`, {
        NgayCt: values.NgayCt.format('YYYY-MM-DD'), 
        SoCt: values.SoCt, 
        MaCt: maCt,
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaCoSoX: values.MaCoSoX, 
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: cookies.id,
        DienGiai: values.DienGiai,
        HTThanhToan: values.HTThanhToan,
        ctPhieuNhap: values.users})
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

  async function DeletePhieuNhap(MaPhieuNhap){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/delete/${MaPhieuNhap}`,{
      
          // NgayCt: values.NgayCt.format('YYYY-MM-DD')
      })
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
      title: 'Ng??y phi???u',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Ng?????i l???p',
      dataIndex: 'TenNhanVien',
      key: 'TenNhanVien',
    },
    {
      title: 'C?? s??? nh???p',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'Nh?? cung c???p',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
    },
    {
      title: 'T???ng s??? l?????ng',
      dataIndex: 'TongSoLuong',
      key: 'TongSoLuong',
      align:'right'
    },
    {
      title: 'T???ng th??nh ti??n',
      dataIndex: 'TongThanhTien',
      key: 'TongThanhTien',
      align:'right'
    },
    // {
    //   title: 'T??nh tr???ng',
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
        <>
          <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuNhapEdit(record.Ident, false)}}>Xem</Button>}
          </Space>
         <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuNhapEdit(record.Ident, true)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a phi???u kh??ng?"
                onConfirm={()=>{DeletePhieuNhap(record.Ident)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.Id} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
      ),
    },
  ];
  
  return(
    <>
      <Title level={3}>Phi???u {title}</Title>
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
         style={{
          top: 0,
        }}
        open={openModalContact}
        size="lg"
        // size={"full"}
        title={!editMode ? `Th??m m???i phi???u ${title}` : `C???p nh???t phi???u ${title}`}
        onCancel={toogleModalFormContact}
        footer={null}
        width={1500}
      >
          <Form form={form} 
              name="dynamic_form_nest_item" 
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={!editMode? CreatePhieuNhap: UpdatePhieuNhap}
            >
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Ng??y phi???u: "
                    name="NgayCt"
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng nh???p ng??y phi???u!'
                      },
                    ]}
                  >
                  <DatePicker  format={"DD-MM-YYYY"} disabled = {!viewMode}  />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                      label="S??? phi???u: "
                      name="SoCt"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p s??? phi???u!'
                        },
                      ]}
                    >
                    <Input readOnly = {!viewMode}   />
                  </Form.Item>
                </Col>
                <Col  span={8}>
                  <Form.Item
                    label={"?????i t?????ng: "}
                    name={"MaDoiTuong"}
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng ch???n ?????i t?????ng!'
                      },
                    ]}
                  >
                    <Select 
                      disabled = {!viewMode} 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsDoiTuong}
                      </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                </Col>
              </Row>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={8}>
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
                      disabled = {!viewMode} 
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
                </Col>              
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="C?? s??? nh???p: "
                  name="MaCoSo"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n c?? s???!'
                    },
                  ]}
                  >
                    <Select 
                      disabled = {!viewMode} 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsCoSo}
                      </Select>
                  </Form.Item>
                </Col> {  maCt === 'NCS' || maCt === 'NPB' ?       
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="C?? s??? xu???t: "
                  name="MaCoSoX"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n c?? s??? xu???t!'
                    },
                  ]}
                  >
                    <Select 
                      disabled = {!viewMode} 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsCoSoX}
                      </Select>
                  </Form.Item>
                </Col> :'' }
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="Di???n gi???i: "
                  name="DienGiai"                  
                  >
                    <Input readOnly = {!viewMode} />
                  </Form.Item>
                </Col>  
              </Row>
              <Divider plain>Chi ti???t phi???u nh???p</Divider>
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const deleteRow = () =>{
                        remove(name)
                        const fields = form.getFieldsValue()
                        const { users } = fields
                        
                        setTongSoLuongNhap(_?.sumBy(users, 'SoLuongNhap'))    
                        setTongThanhTienNhap(_?.sumBy(users, 'ThanhTienNhap'))
                      }
                    return(
                      <Space
                        size={"large"}
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                    <Form.Item
                      {...restField}
                      name={[name, 'MaSach']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng ch???n t??n s??ch!'
                        },
                      ]}
                    >
                    <Select 
                      disabled = {!viewMode} 
                       style={{
                        width: 300,
                      }}
                      placeholder="Ch???n s??ch"
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }
                      >
                        {optionsSach}
                  </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'SoLuongNhap']}
                    rules={[
                      {
                        required: true,
                        message: 'Nh???p s??? l?????ng',
                      },
                    ]}
                  >
                  <InputNumber 
                    readOnly = {!viewMode} 
                    placeholder="S??? l?????ng"
                      style={{
                        width: 80,
                        paddingRight:'15px'
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'DonGiaNhap']}
                    rules={[
                      {
                        required: true,
                        message: 'Nh???p ????n gi??',
                      },
                    ]}
                  >
                  <InputNumber
                    readOnly = {!viewMode} 
                    placeholder="????n gi??"
                      style={{
                        width: 150,
                        paddingRight:'15px'
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'ThanhTienNhap']}                    
                  >
                    <InputNumber
                      readOnly
                      placeholder="Th??nh ti???n"
                        style={{
                          width: 150,                          
                        paddingRight:'15px'
                        }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        min={0}  />
                  </Form.Item>
                  
                  {viewMode && <MinusCircleOutlined onClick={() => deleteRow()} />}
                </Space>
                    )})}
                  <Form.Item>
                    <Button disabled = {!viewMode}  type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Th??m chi ti???t
                    </Button>
                  </Form.Item>
                  </>
                  )}
                </Form.List>
              <Divider/>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >T???ng s??? l?????ng: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongSoLuongNhap}/>
                </Col>
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >T???ng th??nh ti???n: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongThanhTienNhap}
                    style={{
                      width: 200,
                      textAlign:"right"
                    }}
                    />
                </Col>
              </Row>                                        
              <HStack justifyContent="end">
                <Button key="back" onClick={toogleModalFormContact}>Tho??t</Button>
                <Button key="save" type="primary" disabled = {!viewMode}  htmlType="submit">L??u</Button>
              </HStack>
            </Form>
      </Modal>

      {/* Modal t??m ki???m */}
      <Modal
         style={{
          top: 0,
        }}
        open={openModalFilter}
        size="lg"
        title={'T??m ki???m n??ng cao'}
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
              onFinish={filterPhieuNhap}
            >
              
              <Form.Item
                label="T??? ng??y: "
                name="NgayCt1"                    
              >
                <DatePicker  format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item
                label="?????n ng??y: "
                name="NgayCt2"                    
              >
                <DatePicker  format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item
                label={"?????i t?????ng: "}
                name={"MaDoiTuong"}                    
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
                    {optionsDoiTuong}
                  </Select>
              </Form.Item>
              <Form.Item
              label="Lo???i h??nh s??ch: "
              name="MaLoaiHinhSach"
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
                    {optionsLoaiHinhSach}
                  </Select>
              </Form.Item>
              <Form.Item
              label="S??ch: "
              name="MaSach"                  
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
                    {optionsSach}
                  </Select>
              </Form.Item>      
              <HStack justifyContent="end">
                <Button key="back" onClick={toogleModalFormFilter}>Tho??t</Button>
                <Button key="filter" type="primary" htmlType="submit">T??m</Button>
              </HStack>
            </Form>
      </Modal>
    </>
  )
}

export default PhieuNhap;