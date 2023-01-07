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
        return setTitle("xuất cơ sở");
      case 'xuatphathanh':
        return setTitle("xuất phát hành");
      case 'xuatkygui':
         return setTitle("xuất ký gửi");
      case 'xuattang':
        return setTitle("xuất tặng");
      case 'xuatthanhly':
        return setTitle("xuất thanh lý");
      case 'xuattrain':
          return setTitle("xuất trả nhà In-Photo");
      case 'xuatphongban':
        return setTitle("xuất Phòng/Khoa");
      case 'xuatmat':
        return setTitle("xuất mất");
      case 'xuatkhac':
        return setTitle("xuất khác");
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
        MaCoSo: cookies.MaCoSo, 
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
        MaCoSo: cookies.MaCoSo, 
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
      title: 'Ngày phiếu',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Diễn giải',
      dataIndex: 'DienGiai',
      key: 'DienGiai',
    },
    {
      title: 'Người lập',
      dataIndex: 'TenNhanVien',
      key: 'TenNhanVien',
    },
    {
      title: 'Cơ sở',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'Đối tượng',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
    },
    {
      title: 'Tổng số lượng',
      dataIndex: 'TongSoLuong',
      key: 'TongSoLuong',
      align:'right'
    },
    {
      title: 'Tổng thành tiên',
      dataIndex: 'TongThanhTien',
      key: 'TongThanhTien',
      align:'right'
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
        <>
          <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuXuatEdit(record.Ident, false)}}>Xem</Button>}
          </Space>
         <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{GetPhieuXuatEdit(record.Ident, true)}}>Cập nhật</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="Bạn có chắc xóa phiếu không?"
                onConfirm={()=>{DeletePhieuXuat(record.Ident)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.Id} type="link" danger >Xóa</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
      ),
    },
  ];
  
  return(
    <>
      <Title level={3}>Phiếu {title}</Title>
      <Divider />
      <>
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Thêm mới
          </Button>
          <Button  onClick={toogleModalFormFilter} icon={<SearchOutlined />}>
              Tìm kiếm
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
                  title="Đang tải dữ liệu....."                  
                />
              </Spin>
            </> 
            :
              <Table columns={columns} dataSource={data} />}
      </>

      {/* Modal thêm mới */}
      <Modal
         style={{
          top: 0,
        }}
        open={openModalContact}
        size="lg"
        // size={"full"}
        title={!editMode ? `Thêm mới phiếu ${title}` : `Cập nhật phiếu ${title}`}
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
                    label="Ngày phiếu: "
                    name="NgayCt"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập ngày phiếu!'
                      },
                    ]}
                  >
                  <DatePicker  format={"DD-MM-YYYY"} disabled = {!viewMode}  />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                      label="Số phiếu: "
                      name="SoCt"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số phiếu!'
                        },
                      ]}
                    >
                    <Input readOnly = {!viewMode}   />
                  </Form.Item>
                </Col>
                <Col  span={8}>
                  <Form.Item
                    label={"Đối tượng: "}
                    name= {"MaDoiTuong"}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn đối tượng!'
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
                {/* <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="Loại hình sách: "
                  name="MaLoaiHinhSach"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn loại hình sách!'
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
                </Col>                 */}
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="Diễn giải: "
                  name="DienGiai"
                  
                  >
                    <Input readOnly = {!viewMode} />
                  </Form.Item>
                </Col> 
                <Col className="gutter-row" span={8}>
                <Form.Item    
                    label="Phí vận chuyển: "               
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
              <Divider plain>Chi tiết phiếu xuất</Divider>
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
                          message: 'Vui lòng chọn tên sách!'
                        },
                      ]}
                    >
                    <Select 
                      disabled = {!viewMode} 
                       style={{
                        width: 350,
                      }}
                      placeholder="Chọn sách"
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
                        message: 'Nhập số lượng',
                      },
                    ]}
                  >
                  <InputNumber 
                    readOnly = {!viewMode} 
                    placeholder="Số lượng"
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
                        message: 'Nhập đơn giá',
                      },
                    ]}
                  >
                  <InputNumber
                    readOnly = {!viewMode} 
                    placeholder="Đơn giá"                  
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
                      placeholder="Thành tiền"
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
                      Thêm chi tiết
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
                  <Title level={5} >Tổng số lượng: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongSoLuongXuat}/>
                </Col>
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >Tổng thành tiền: </Title>
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
                <Button key="back" onClick={toogleModalFormContact}>Thoát</Button>
                <Button key="save" type="primary" disabled = {!viewMode}  htmlType="submit">Lưu</Button>
              </HStack>
            </Form>
      </Modal>
      {/* Modal tìm kiếm */}
      <Modal
         style={{
          top: 0,
        }}
        open={openModalFilter}
        size="lg"
        title={'Tìm kiếm nâng cao'}
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
                label="Từ ngày: "
                name="NgayCt1"                    
              >
                <DatePicker  format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item
                label="Đến ngày: "
                name="NgayCt2"                    
              >
                <DatePicker  format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item
                label={"Đối tượng: "}
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
              label="Loại hình sách: "
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
              label="Sách: "
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
                <Button key="back" onClick={toogleModalFormFilter}>Thoát</Button>
                <Button key="filter" type="primary" htmlType="submit">Tìm</Button>
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