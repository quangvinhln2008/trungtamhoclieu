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

const PhieuXuat = () =>{
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
  const [dataGiaVatTu, setDataGiaVatTu] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [optionsSach, setOptionSach] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsCoSo, setOptionCoSo] = useState()
  const [optionsCoSoN, setOptionCoSoN] = useState()
  const [optionsDoiTuong, setOptionDoiTuong] = useState()
  const [optionsNhanVien, setOptionNhanVien] = useState()
  const [tongSoLuongXuat,setTongSoLuongXuat] = useState(0)
  const [tongThanhTienXuat,setTongThanhTienXuat] = useState(0)
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
      case 'xuatcoso':
        return setMaCt("XCS");
      case 'xuatphathanh':
        return setMaCt("XPH");
      case 'xuatkygui':
         return setMaCt("XKG");
      case 'xuattang':
        return setMaCt("XT");
      case 'xuatthanhly':
        return setMaCt("XTL");
      case 'xuattrain':
          return setMaCt("XTI");
      case 'xuatphongban':
        return setMaCt("XPB");
      case 'xuatmat':
        return setMaCt("XM");
      case 'xuatkhac':
        return setMaCt("XK");
      default: 
        return ''
    }
  }

  function getTitle (type)
  {
    switch (type.toLowerCase()) {
      case 'xuatcoso':
        return setTitle("xu???t c?? s???");
      case 'xuatphathanh':
        return setTitle("xu???t ph??t h??nh");
      case 'xuatkygui':
         return setTitle("xu???t k?? g???i");
      case 'xuattang':
        return setTitle("xu???t t???ng");
      case 'xuatthanhly':
        return setTitle("xu???t thanh l??");
      case 'xuattrain':
          return setTitle("xu???t tr??? nh?? In-Photo");
      case 'xuatphongban':
        return setTitle("xu???t Ph??ng/Khoa");
      case 'xuatmat':
        return setTitle("xu???t m???t");
      case 'xuatkhac':
        return setTitle("xu???t kh??c");
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
      loadPhieuXuat()
    }, 1000);
  },[type])
  

  useEffect(()=>{
    setTimeout(() => {    
      setLoading(true)
      loadPhieuXuat()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    
    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSoN(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
    setTongSoLuongXuat(_?.sumBy(dataEditCt, 'SoLuongXuat'))    
    setTongThanhTienXuat(_?.sumBy(dataEditCt, 'ThanhTienXuat'))

    form.setFieldsValue({
        NgayCt: moment(dataEdit?.NgayCt, 'YYYY/MM/DD'),
        SoCt: dataEdit?.SoCt,
        MaLoaiHinhSach: dataEdit?.MaLoaiHinhSach,
        MaCoSo : dataEdit?.MaCoSo,
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
    setOptionCoSoN(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    setTongSoLuongXuat(0)
    setTongThanhTienXuat(0)

    form.setFieldsValue({
        NgayCt: moment(),
        SoCt: "",
        MaDoiTuong: "",
        MaNhanVien: "",
        MaLoaiHinhSach: "",
        MaCoSo : "",
        DienGiai : "",
        HTThanhToan:"",
        Phi_Vchuyen:0,
        users:[]
    })
  }

  function openFilterMode(){
    setOpenModalFilter(!openModalFilter)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

  }
  const onDonGiaChange = (name) => {
    
    const fields = form.getFieldsValue()
    const { users } = fields

    Object.assign(users[name], { ThanhTienXuat: fields.users[name].SoLuongXuat * fields.users[name].DonGiaXuat })
    form.setFieldsValue({users})
    setTongSoLuongXuat(_?.sumBy(users, 'SoLuongXuat'))    
    setTongThanhTienXuat(_?.sumBy(users, 'ThanhTienXuat'))
  }

  const onMaSachChange = (name) => {
    
    const fields = form.getFieldsValue()
    const { users } = fields
    const selectedVatTu = dataGiaVatTu?.filter(item => item.MaSach === fields.users[name].MaSach)
    
    Object.assign(users[name], { DonGiaXuat: selectedVatTu[0]?.GiaBan})
    form.setFieldsValue({users})
  }

  function resetData(){    
    formFilter.setFieldsValue({
      MaDoiTuong: "",
      MaLoaiHinhSach: "",
  })
    setLoading(true)
    setTimeout(() => {    
      loadPhieuXuat()
    }, 1000);
    
  }

  async function loadPhieuXuat(){
    const header = getHeader()
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat?type=${type}`,{headers:header})
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
        setDataGiaVatTu(result.data[6])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function filterPhieuXuat(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/filter', {        
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

  async function GetPhieuXuatEdit(MaPhieuXuat, isEdit){
    setEditMode(isEdit)
    setViewMode(isEdit)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/${MaPhieuXuat}`)
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

  async function CreatePhieuXuat(values){
    const header = getHeader()
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/create', {
        Ident: Ident,
        NgayCt: values.NgayCt.format("YYYY-MM-DD"),
        MaCt: maCt,
        LoaiCt: '2',
        SoCt: values.SoCt, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: maCt === 'XPH' ?cookies.MaCoSo : values.MaCoSo, 
        MaCoSoN: values.MaCoSoN, 
        MaSach: values.MaSach, 
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: cookies.id,
        DienGiai: values.DienGiai,
        Phi_Vchuyen: values.Phi_Vchuyen,
        ctPhieuXuat: values.users  
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

  async function UpdatePhieuXuat(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/${dataEdit?.Ident}`, {
        NgayCt: values.NgayCt.format('YYYY-MM-DD'), 
        SoCt: values.SoCt, 
        MaCt: maCt,
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: maCt === 'XPH' ? cookies.MaCoSo : values.MaCoSo,
        MaCoSoN: values.MaCoSoN,
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: cookies.id,
        DienGiai: values.DienGiai,
        Phi_Vchuyen: values.Phi_Vchuyen,
        HTThanhToan: values.HTThanhToan,
        ctPhieuXuat: values.users})
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

  async function DeletePhieuXuat(MaPhieuXuat){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/delete/${MaPhieuXuat}`,{
      
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
      title: 'Di???n gi???i',
      dataIndex: 'DienGiai',
      key: 'DienGiai',
    },
    {
      title: 'Ng?????i l???p',
      dataIndex: 'TenNhanVien',
      key: 'TenNhanVien',
    },
    {
      title: 'C?? s??? xu???t',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: '?????i t?????ng',
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
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuXuatEdit(record.Ident, false)}}>Xem</Button>}
          </Space>
         <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuXuatEdit(record.Ident, true)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a phi???u kh??ng?"
                onConfirm={()=>{DeletePhieuXuat(record.Ident)}}
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
              onFinish={!editMode? CreatePhieuXuat: UpdatePhieuXuat}
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
                    name= {"MaDoiTuong"}
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
                { maCt !== 'XPH' && <>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="C?? s??? xu???t: "
                  name="MaCoSo"
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
                        {optionsCoSo}
                      </Select>
                  </Form.Item>
                </Col>    
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="C?? s??? nh???p: "
                  name="MaCoSoN"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n c?? s??? nh???p!'
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
                </Col> 
                </>}            
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="Di???n gi???i: "
                  name="DienGiai"
                  
                  >
                    <Input readOnly = {!viewMode} />
                  </Form.Item>
                </Col> 
                <Col className="gutter-row" span={8}>
                <Form.Item    
                    label="Ph?? v???n chuy???n: "               
                    name='Phi_Vchuyen'                    
                  >
                  <InputNumber
                      min={0}  
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      stringMode
                      style={{
                        width: 150,
                        padding: '0px 20px'
                      }}
                      />
                  </Form.Item>
                </Col> 
              </Row>
              <Divider plain>Chi ti???t phi???u xu???t</Divider>
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const deleteRow = () =>{
                        remove(name)
                        const fields = form.getFieldsValue()
                        const { users } = fields
                        
                        setTongSoLuongXuat(_?.sumBy(users, 'SoLuongXuat'))    
                        setTongThanhTienXuat(_?.sumBy(users, 'ThanhTienXuat'))
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
                        width: 350,
                      }}
                      placeholder="Ch???n s??ch"
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }
                      onChange={() =>onMaSachChange(name)}
                      >
                        {optionsSach}
                  </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'SoLuongXuat']}
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
                        width: 150,
                        padding:'0px 20px'
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'DonGiaXuat']}
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
                        padding:'0px 20px'
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'ThanhTienXuat']}                    
                  >
                    <InputNumber
                      readOnly
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder="Th??nh ti???n"
                        style={{
                          width: 150,
                          textAlign: "right"
                        }}                        
                        />
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
                    value = {tongSoLuongXuat}/>
                </Col>
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >T???ng th??nh ti???n: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongThanhTienXuat}
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
              onFinish={filterPhieuXuat}
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

export default PhieuXuat;
// import React from "react";
// import {
//   useSearchParams,
// } from "react-router-dom";

// const PhieuXuat = () =>{
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log('type',searchParams.get('type'))

//   return(
//     <>
//       <p>Phieu {searchParams.get('type')}</p>
//     </>
//   )
// }
// export default PhieuXuat;